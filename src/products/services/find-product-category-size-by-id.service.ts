import { Injectable } from '@nestjs/common';
import { AbstractFindEntityByIdService, NestLoggerService } from '../../common';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategorySizesTypeORMRepository } from '../repositories/product-category-sizes-typeorm.repository';

@Injectable()
export class FindProductCategorySizeByIdService extends AbstractFindEntityByIdService<ProductCategorySize> {
  constructor(
    private readonly productCategorySizesRepository: ProductCategorySizesTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(productCategorySizesRepository, logger);
  }
}
