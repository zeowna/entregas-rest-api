import { Injectable } from '@nestjs/common';
import { AbstractTypeORMRepository } from '../../common/repository/abstract-typeorm.repository';
import { ProductCategory } from './entities/product-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryRepository extends AbstractTypeORMRepository<ProductCategory> {
  constructor(
    @InjectRepository(ProductCategory)
    productCategorySizeRepository: Repository<ProductCategory>,
  ) {
    super(productCategorySizeRepository);
  }
}
