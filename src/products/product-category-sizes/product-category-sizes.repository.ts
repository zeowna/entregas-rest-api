import { Injectable } from '@nestjs/common';
import { AbstractTypeORMRepository } from '../../common/repository/abstract-typeorm.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategorySize } from './entities/product-category-size.entity';

@Injectable()
export class ProductCategorySizesRepository extends AbstractTypeORMRepository<ProductCategorySize> {
  constructor(
    @InjectRepository(ProductCategorySize)
    productCategorySizeRepository: Repository<ProductCategorySize>,
  ) {
    super(productCategorySizeRepository);
  }
}
