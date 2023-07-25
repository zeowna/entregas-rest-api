import { Injectable } from '@nestjs/common';
import { ProductCategory } from '../entities/product-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractTypeORMRepository } from '../../common';

@Injectable()
export class ProductCategoryTypeORMRepository extends AbstractTypeORMRepository<ProductCategory> {
  constructor(
    @InjectRepository(ProductCategory)
    productCategorySizeRepository: Repository<ProductCategory>,
  ) {
    super(productCategorySizeRepository);
  }
}
