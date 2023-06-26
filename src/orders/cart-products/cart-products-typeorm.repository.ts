import { Injectable } from '@nestjs/common';
import { AbstractTypeORMRepository } from '../../common/repository/abstract-typeorm.repository';
import { CartProduct } from './entities/cart-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartProductsTypeORMRepository extends AbstractTypeORMRepository<CartProduct> {
  constructor(
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,
  ) {
    super(cartProductRepository);
  }
}
