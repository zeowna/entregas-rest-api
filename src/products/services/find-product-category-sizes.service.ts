import { Injectable } from '@nestjs/common';
import { AbstractFindEntitiesService, NestLoggerService } from '../../common';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategorySizesTypeORMRepository } from '../repositories/product-category-sizes-typeorm.repository';
import { FindProductCategorySizeResponse } from '../responses/find-product-category-size.response';
import { CountProductCategorySizesService } from './count-product-category-sizes.service';

@Injectable()
export class FindProductCategorySizesService extends AbstractFindEntitiesService<
  ProductCategorySize,
  FindProductCategorySizeResponse
> {
  constructor(
    private readonly productCategorySizesTypeORMRepository: ProductCategorySizesTypeORMRepository,
    private readonly countProductCategorySizeService: CountProductCategorySizesService,
    private readonly logger: NestLoggerService,
  ) {
    super(
      productCategorySizesTypeORMRepository,
      countProductCategorySizeService,
      logger,
      FindProductCategorySizeResponse,
    );
  }
}
