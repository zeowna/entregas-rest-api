import { Injectable } from '@nestjs/common';
import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductCategoryTypeORMRepository } from '../repositories/product-category-typeorm-repository';

@Injectable()
export class CreateProductCategoryService extends AbstractCreateEntityService<ProductCategory> {
  constructor(
    private readonly productsCategoriesRepository: ProductCategoryTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(productsCategoriesRepository, logger);
  }
}
