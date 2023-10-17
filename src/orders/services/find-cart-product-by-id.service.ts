import { Injectable } from '@nestjs/common';
import { AbstractFindEntityByIdService, NestLoggerService } from '../../common';
import { CartProduct } from '../entities/cart-product.entity';
import { CartProductsTypeORMRepository } from '../repositories/cart-products-typeorm.repository';

@Injectable()
export class FindCartProductByIdService extends AbstractFindEntityByIdService<CartProduct> {
  constructor(
    private readonly cartProductsRepository: CartProductsTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(cartProductsRepository, logger);
  }
}
