import { Injectable } from '@nestjs/common';
import { AbstractFindEntitiesService, NestLoggerService } from '../../common';
import { CountProductCategoriesService } from './count-product-categories.service';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductCategoriesTypeORMRepository } from '../repositories/product-categories-typeorm.repository';
import { FindProductCategoriesResponse } from '../responses/find-product-categories.response';

@Injectable()
export class FindProductCategoriesService extends AbstractFindEntitiesService<
  ProductCategory,
  FindProductCategoriesResponse
> {
  constructor(
    private readonly productCategoriesRepository: ProductCategoriesTypeORMRepository,
    private readonly countProductCategoriesService: CountProductCategoriesService,
    private readonly logger: NestLoggerService,
  ) {
    super(
      productCategoriesRepository,
      countProductCategoriesService,
      logger,
      FindProductCategoriesResponse,
    );
  }
}
