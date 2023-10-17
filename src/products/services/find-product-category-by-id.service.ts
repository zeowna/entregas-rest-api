import { Injectable } from '@nestjs/common';
import { AbstractFindEntityByIdService, NestLoggerService } from '../../common';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductCategoriesTypeORMRepository } from '../repositories/product-categories-typeorm.repository';

@Injectable()
export class FindProductCategoryByIdService extends AbstractFindEntityByIdService<ProductCategory> {
  constructor(
    private readonly productCategoriesRepository: ProductCategoriesTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(productCategoriesRepository, logger);
  }
}
