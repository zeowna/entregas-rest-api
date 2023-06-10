import { Injectable } from '@nestjs/common';
import { AbstractService } from '../../common/service/abstract-service.service';
import { CartProduct } from './entities/cart-product.entity';
import { CartProductsTypeORMRepository } from './cart-products-typeorm.repository';

@Injectable()
export class CartProductsService extends AbstractService<CartProduct> {
  constructor(
    private readonly cartProductsRepository: CartProductsTypeORMRepository,
  ) {
    super(cartProductsRepository);
  }
}
