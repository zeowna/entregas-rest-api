import { Injectable } from '@nestjs/common';
import { AbstractService, ID, NestLoggerService } from '../../common';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategorySizesTypeORMRepository } from '../repositories/product-category-sizes-typeorm.repository';

@Injectable()
export class FindProductCategorySizeByCategoryIdAndNameService extends AbstractService<ProductCategorySize> {
  constructor(
    protected readonly productCategoriesRepository: ProductCategorySizesTypeORMRepository,
    protected readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(productCategoryId: ID, name: string, correlationId: string) {
    this.logBefore({
      productCategoryId,
      name,
      correlationId,
    });

    const found =
      await this.productCategoriesRepository.findByCategoryIdAndName(
        productCategoryId,
        name,
      );

    this.logAfter({
      productCategoryId,
      name,
      found,
      correlationId,
    });

    return found;
  }
}
