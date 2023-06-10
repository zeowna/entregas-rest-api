import { Injectable } from '@nestjs/common';
import { AbstractService } from '../../common/service/abstract-service.service';
import { ProductCategory } from './entities/product-category.entity';
import { ProductCategoryTypeORMRepository } from './product-category-typeorm-repository';

@Injectable()
export class ProductCategoriesService extends AbstractService<ProductCategory> {
  constructor(
    private readonly productCategoryRepository: ProductCategoryTypeORMRepository,
  ) {
    super(productCategoryRepository);
  }
}
