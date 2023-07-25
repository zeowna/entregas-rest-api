import { Injectable } from '@nestjs/common';
import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategorySizesTypeORMRepository } from '../repositories/product-category-sizes-typeorm.repository';

@Injectable()
export class CreateProductCategorySizeService extends AbstractCreateEntityService<ProductCategorySize> {
  constructor(
    private readonly productsCategorySizesRepository: ProductCategorySizesTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(productsCategorySizesRepository, logger);
  }
}
