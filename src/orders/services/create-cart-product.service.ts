import { Injectable, NotFoundException } from '@nestjs/common';
import {
  AbstractCreateEntityService,
  DatabaseTransactionRunnerInterface,
  NestLoggerService,
} from '../../common';
import { CartProduct } from '../entities/cart-product.entity';
import { CartProductsTypeORMRepository } from '../repositories/cart-products-typeorm.repository';
import { CreateCartProductDto } from '../dto/create-cart-product.dto';
import { FindUserByIdService } from '../../users/services/find-user-by-id.service';
import { FindPartnerProductByIdService } from '../../partners/services/find-partner-product-by-id.service';
import { FindOrderByIdService } from './find-order-by-id.service';
import { CustomerUser } from '../../users/entities/customer-user.entity';
import { UpdatePartnerProductService } from '../../partners/services/update-partner-product.service';
import { UpdatePartnerProductDto } from '../../partners/dto/update-partner-product.dto';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class CreateCartProductService extends AbstractCreateEntityService<CartProduct> {
  constructor(
    private readonly cartProductsRepository: CartProductsTypeORMRepository,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly findPartnerProductByIdService: FindPartnerProductByIdService,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly updatePartnerProductService: UpdatePartnerProductService,
    private readonly logger: NestLoggerService,
  ) {
    super(cartProductsRepository, logger);
  }

  protected async beforeCreate(
    createCartProductDto: CreateCartProductDto,
    correlationId: string,
    i18n: I18nContext,
  ) {
    const [customer, partnerProduct, order] = await Promise.all([
      this.findUserByIdService.execute(
        createCartProductDto.customerId,
        correlationId,
      ),
      this.findPartnerProductByIdService.execute(
        createCartProductDto.partnerProductId,
        correlationId,
      ),
      this.findOrderByIdService.execute(
        createCartProductDto.orderId,
        correlationId,
      ),
    ]);

    const inStock =
      partnerProduct.inStockQuantity - createCartProductDto.quantity;
    const isProductAvailable = inStock >= 0;

    if (!isProductAvailable) {
      throw new NotFoundException(
        i18n.translate('validation.CartProduct.productUnavailable', {
          args: {
            productName: `${partnerProduct.product.name} ${partnerProduct.product.size}`,
          },
        }),
      );
    }

    return new CartProduct({
      ...createCartProductDto.toEntity(),
      customer: customer as CustomerUser,
      partnerProduct,
      order,
      totalValue: createCartProductDto.quantity * partnerProduct.value,
    });
  }

  protected async afterCreate(
    createCartProductDto: CreateCartProductDto,
    cartProduct: CartProduct,
    correlationId: string,
    i18n: I18nContext,
    transactionRunner: DatabaseTransactionRunnerInterface,
  ) {
    await this.updatePartnerProductService.execute(
      cartProduct.partnerProduct.id,
      new UpdatePartnerProductDto({
        inStockQuantity: cartProduct.partnerProduct.inStockQuantity - 1,
      }),
      correlationId,
      i18n,
      transactionRunner,
    );
  }
}
