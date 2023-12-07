import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AbstractService, NestLoggerService } from '../../common';
import { CartProduct } from '../entities/cart-product.entity';
import { I18nContext } from 'nestjs-i18n';
import { UpdateOrderService } from './update-order.service';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { CreateCartProductsDto } from '../dto/create-cart-products.dto';
import { CreateCartProductService } from './create-cart-product.service';
import { TypeORMTransactionFactory } from '../../db/transaction/typeorm-transaction.factory';
import { SocketGateway } from '../../sockets/socket.gateway';
import { OrderStatus } from '../entities/order-status.enum';
import { SendEmailService } from 'src/mailer/services/send-email.service';
import { readFile } from 'fs/promises';
import { FindOrderByIdService } from './find-order-by-id.service';

@Injectable()
export class CreateCartProductsService extends AbstractService<CartProduct[]> {
  constructor(
    private readonly transactionFactory: TypeORMTransactionFactory,
    private readonly createCartProductService: CreateCartProductService,
    private readonly updateOrderService: UpdateOrderService,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly socket: SocketGateway,
    private readonly sendEmailService: SendEmailService,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(
    createCartProductsDto: CreateCartProductsDto,
    correlationId: string,
    i18n?: I18nContext,
  ) {
    this.logBefore({
      createCartProductsDto,
      correlationId,
    });

    const transactionRunner = await this.transactionFactory.getRunner();
    await transactionRunner.start();

    if (!transactionRunner.runner.isTransactionActive) {
      throw new InternalServerErrorException('Transaction is not active');
    }

    try {
      const result: CartProduct[] = [];

      for (const createCartProductDto of createCartProductsDto.cart) {
        createCartProductDto.orderId = createCartProductsDto.orderId;
        createCartProductDto.customerId = createCartProductsDto.customerId;

        result.push(
          await this.createCartProductService.execute(
            createCartProductDto,
            correlationId,
            i18n,
            transactionRunner,
          ),
        );
      }

      await this.updateOrderService.execute(
        createCartProductsDto.cart[0].orderId,
        new UpdateOrderDto({
          status: OrderStatus.AwaitingPartner,
          totalValue: result.reduce(
            (acc, cartProduct) => acc + cartProduct.totalValue,
            0,
          ),
        }),
        correlationId,
        i18n,
        transactionRunner,
      );

      await transactionRunner.commit();

      const updatedOrder = await this.findOrderByIdService.execute(
        createCartProductsDto.cart[0].orderId,
        correlationId,
      );

      this.logAfter({
        createCartProductsDto,
        correlationId,
        result,
        updatedOrder,
        success: true,
      });

      this.socket.emit(
        `partner-order-updated-${updatedOrder.partner.id}`,
        updatedOrder,
      );
      this.socket.emit(
        `customer-order-updated-${createCartProductsDto.customerId}`,
        updatedOrder,
      );

      const template = await readFile(
        `${process.cwd()}/media/templates/order-updated.html`,
        'utf-8',
      );

      const orderId = `#${String(updatedOrder?.id).padStart(4, '0')}`;

      await this.sendEmailService.execute(
        result[0].customer.email,
        `Atualização no Pedido ${orderId}`,
        template,
        {
          userName: result[0].customer.name,
          orderId,
          orderStatus: i18n.translate(
            `entity.Order.status.${updatedOrder.status}`,
          ),
        },
        correlationId,
      );

      return result;
    } catch (err) {
      this.logAfter({
        err,
        createCartProductsDto,
        correlationId,
        success: false,
      });

      await transactionRunner.rollback();
      throw err;
    } finally {
      await transactionRunner.release();
    }
  }
}
