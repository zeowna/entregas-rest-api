import { Injectable } from '@nestjs/common';
import { AbstractService } from '../../common/service/abstract-service.service';
import { ProductCategorySize } from './entities/product-category-size.entity';
import { ProductCategorySizesRepository } from './product-category-sizes.repository';

@Injectable()
export class ProductCategorySizesService extends AbstractService<ProductCategorySize> {
  constructor(
    private readonly productSizesCategoryRepository: ProductCategorySizesRepository,
  ) {
    super(productSizesCategoryRepository);
  }
}
