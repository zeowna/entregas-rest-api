import { Injectable } from '@nestjs/common';
import { AbstractTypeORMRepository } from '../common/repository/abstract-typeorm.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository extends AbstractTypeORMRepository<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {
    super(productRepo);
  }
}
