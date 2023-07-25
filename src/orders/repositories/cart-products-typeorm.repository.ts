import { Injectable } from '@nestjs/common';
import { CartProduct } from '../entities/cart-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractTypeORMRepository } from '../../common';

@Injectable()
export class CartProductsTypeORMRepository extends AbstractTypeORMRepository<CartProduct> {
  constructor(
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,
  ) {
    super(cartProductRepository);
  }
}
