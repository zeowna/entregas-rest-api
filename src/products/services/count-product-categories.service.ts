import { Injectable } from '@nestjs/common';
import { AbstractCountEntitiesService, NestLoggerService } from '../../common';
import { ProductCategoriesTypeORMRepository } from '../repositories/product-categories-typeorm.repository';
import { ProductCategory } from '../entities/product-category.entity';

@Injectable()
export class CountProductCategoriesService extends AbstractCountEntitiesService<ProductCategory> {
  constructor(
    private readonly productCategoryRepository: ProductCategoriesTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(productCategoryRepository, logger);
  }
}
