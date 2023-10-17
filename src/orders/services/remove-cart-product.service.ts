import { Injectable } from '@nestjs/common';
import { AbstractRemoveEntityService, NestLoggerService } from '../../common';
import { CartProduct } from '../entities/cart-product.entity';
import { CartProductsTypeORMRepository } from '../repositories/cart-products-typeorm.repository';
import { FindCartProductByIdService } from './find-cart-product-by-id.service';

@Injectable()
export class RemoveCartProductService extends AbstractRemoveEntityService<CartProduct> {
  constructor(
    private readonly cartProductsRepository: CartProductsTypeORMRepository,
    private readonly findCartProductByIdService: FindCartProductByIdService,
    private readonly logger: NestLoggerService,
  ) {
    super(cartProductsRepository, findCartProductByIdService, logger);
  }
}
