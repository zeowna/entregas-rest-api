import { Injectable } from '@nestjs/common';
import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { CartProduct } from '../entities/cart-product.entity';
import { CartProductsTypeORMRepository } from '../repositories/cart-products-typeorm.repository';
import { CreateCartProductDto } from '../dto/create-cart-product.dto';
import { FindUserByIdService } from '../../users/services/find-user-by-id.service';
import { FindPartnerProductByIdService } from '../../partners/services/find-partner-product-by-id.service';
import { FindOrderByIdService } from './find-order-by-id.service';
import { CustomerUser } from '../../users/entities/customer-user.entity';
import { UpdatePartnerProductService } from '../../partners/services/update-partner-product.service';
import { UpdatePartnerProductDto } from '../../partners/dto/update-partner-product.dto';

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

    return new CartProduct({
      ...createCartProductDto.toEntity(),
      customer: customer as CustomerUser,
      partnerProduct,
      quantity: 1,
      order,
    });
  }

  protected async afterCreate(
    createCartProductDto: CreateCartProductDto,
    cartProduct: CartProduct,
    correlationId: string,
  ) {
    await this.updatePartnerProductService.execute(
      cartProduct.partnerProduct.id,
      new UpdatePartnerProductDto({
        inStockQuantity: cartProduct.partnerProduct.inStockQuantity - 1,
      }),
      correlationId,
    );
  }
}
