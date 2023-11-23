import { Injectable } from '@nestjs/common';
import { AbstractService, NestLoggerService } from '../../common';
import { CartProduct } from '../entities/cart-product.entity';
import { I18nContext } from 'nestjs-i18n';
import { UpdateOrderService } from './update-order.service';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { CreateCartProductsDto } from '../dto/create-cart-products.dto';
import { CreateCartProductService } from './create-cart-product.service';

@Injectable()
export class CreateCartProductsService extends AbstractService<CartProduct[]> {
  constructor(
    private readonly createCartProductService: CreateCartProductService,
    private readonly updateOrderService: UpdateOrderService,
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

    const result = await Promise.all(
      createCartProductsDto.cart.map(async (createCartProductDto) => {
        createCartProductDto.orderId = createCartProductsDto.orderId;
        createCartProductDto.customerId = createCartProductsDto.customerId;

        return this.createCartProductService.execute(
          createCartProductDto,
          correlationId,
          i18n,
        );
      }),
    );

    await this.updateOrderService.execute(
      createCartProductsDto.cart[0].orderId,
      new UpdateOrderDto({
        totalValue: result.reduce(
          (acc, cartProduct) => acc + cartProduct.totalValue,
          0,
        ),
      }),
      correlationId,
    );

    try {
      this.logAfter({
        createCartProductsDto,
        correlationId,
        result,
        success: true,
      });

      return result;
    } catch (err) {
      this.logAfter({
        err,
        createCartProductsDto,
        correlationId,
        success: false,
      });
    }
  }
}
