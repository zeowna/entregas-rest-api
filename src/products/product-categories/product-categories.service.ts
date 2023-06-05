import { Injectable } from '@nestjs/common';
import { AbstractService } from '../../common/service/abstract-service.service';
import { ProductCategory } from './entities/product-category.entity';
import { ProductCategoryRepository } from './product-category.repository';

@Injectable()
export class ProductCategoriesService extends AbstractService<ProductCategory> {
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {
    super(productCategoryRepository);
  }
}
