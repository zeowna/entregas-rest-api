import { Injectable } from '@nestjs/common';
import { AbstractService } from '../../common/service/abstract-service.service';
import { ProductCategorySize } from './entities/product-category-size.entity';
import { ProductCategorySizesTypeORMRepository } from './product-category-sizes-typeorm.repository';

@Injectable()
export class ProductCategorySizesService extends AbstractService<ProductCategorySize> {
  constructor(
    private readonly productSizesCategoryRepository: ProductCategorySizesTypeORMRepository,
  ) {
    super(productSizesCategoryRepository);
  }
}
