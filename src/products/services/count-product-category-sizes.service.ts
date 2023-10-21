import { Injectable } from '@nestjs/common';
import { AbstractCountEntitiesService, NestLoggerService } from '../../common';
import { ProductCategorySizesTypeORMRepository } from '../repositories/product-category-sizes-typeorm.repository';
import { ProductCategorySize } from '../entities/product-category-size.entity';

@Injectable()
export class CountProductCategorySizesService extends AbstractCountEntitiesService<ProductCategorySize> {
  constructor(
    private readonly productCategorySizesTypeORMRepository: ProductCategorySizesTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(productCategorySizesTypeORMRepository, logger);
  }
}
