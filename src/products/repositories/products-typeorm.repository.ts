import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { AbstractTypeORMRepository } from '../../common';

@Injectable()
export class ProductsTypeORMRepository extends AbstractTypeORMRepository<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {
    super(productRepo);
  }

  async findByName(name: string) {
    return this.productRepo.findOneBy({ name });
  }
}
