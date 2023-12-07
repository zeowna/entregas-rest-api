import { ConflictException, Injectable } from '@nestjs/common';
import { AbstractService, ID, NestLoggerService } from '../../common';
import { Order } from '../entities/order.entity';
import { OrdersTypeORMRepository } from '../repositories/orders-typeorm.repository';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { DateTime } from 'luxon';
import { FindOrderByIdService } from './find-order-by-id.service';
import { OrderStatus } from '../entities/order-status.enum';
import { I18nContext } from 'nestjs-i18n';
import { UpdatePartnerProductService } from '../../partners/services/update-partner-product.service';
import { UpdatePartnerProductDto } from '../../partners/dto/update-partner-product.dto';
import { SocketGateway } from '../../sockets/socket.gateway';
import { SendEmailService } from 'src/mailer/services/send-email.service';
import { readFile } from 'fs/promises';

@Injectable()
export class UpdateOrderStatusService extends AbstractService<Order> {
  constructor(
    private readonly ordersRepository: OrdersTypeORMRepository,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly updatePartnerProductService: UpdatePartnerProductService,
    private readonly socket: SocketGateway,
    private readonly sendEmailService: SendEmailService,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(
    id: ID,
    updateOrderStatusDto: UpdateOrderStatusDto,
    correlationId: string,
    i18n: I18nContext,
  ) {
    this.logBefore({
      updateOrderStatusDto,
      correlationId,
    });

    try {
      const existing = await this.findOrderByIdService.execute(
        id,
        correlationId,
      );

      const isAlreadySettled = [
        OrderStatus.CanceledByCustomer,
        OrderStatus.CanceledByPartner,
        OrderStatus.RefusedByPartner,
        OrderStatus.Settled,
      ];

      const isCancelationStatus = [
        OrderStatus.CanceledByCustomer,
        OrderStatus.CanceledByPartner,
        OrderStatus.RefusedByPartner,
      ];

      if (isAlreadySettled.includes(existing.status)) {
        throw new ConflictException(
          i18n.translate('validation.Order.status.isAlreadySettled'),
        );
      }

      const updated = await this.ordersRepository.update(
        id,
        new Order({
          ...updateOrderStatusDto.toEntity(),
          statusUpdatedAt: DateTime.now().toJSDate(),
        }),
      );

      if (isCancelationStatus.includes(updated.status)) {
        for (const cartProduct of updated.cart) {
          await this.updatePartnerProductService.execute(
            cartProduct.partnerProduct.id,
            new UpdatePartnerProductDto({
              inStockQuantity:
                cartProduct.quantity +
                cartProduct.partnerProduct.inStockQuantity,
            }),
            correlationId,
          );
        }
      }

      this.logAfter({
        updateOrderStatusDto,
        correlationId,
        updated,
        success: true,
      });

      this.socket.emit(`partner-order-updated-${updated.partner.id}`, updated);
      this.socket.emit(
        `customer-order-customer-${updated.customer.id}`,
        updated,
      );

      const template = await readFile(
        `${process.cwd()}/media/templates/order-updated.html`,
        'utf-8',
      );

      const orderId = `#${String(updated.id).padStart(4, '0')}`;

      await this.sendEmailService.execute(
        updated.customer.email,
        `Atualização no Pedido ${orderId}`,
        template,
        {
          userName: updated.customer.name,
          orderId,
          orderStatus: i18n.translate(`entity.Order.status.${updated.status}`),
        },
        correlationId,
      );

      return updated;
    } catch (err) {
      this.logAfter({
        errJSON: JSON.stringify(err),
        err,
        updateOrderStatusDto,
        correlationId,
        success: false,
      });

      throw err;
    }
  }
}
