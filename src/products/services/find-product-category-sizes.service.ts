import { Injectable } from '@nestjs/common';
import { AbstractService, ID, NestLoggerService } from '../../common';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategorySizesTypeORMRepository } from '../repositories/product-category-sizes-typeorm.repository';

@Injectable()
export class FindProductCategorySizesService extends AbstractService<
  ProductCategorySize[]
> {
  constructor(
    private readonly productCategorySizesTypeORMRepository: ProductCategorySizesTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  private async findByCategoryId(categoryId: ID) {
    return this.productCategorySizesTypeORMRepository.findByCategoryId(
      categoryId,
    );
  }

  async execute(productCategoryId: number, correlationId: string) {
    try {
      this.logBefore({
        productCategoryId,
        correlationId,
      });

      const found = await this.findByCategoryId(productCategoryId);

      this.logAfter({
        success: true,
        correlationId,
        found,
      });

      return found;
    } catch (err) {
      this.logAfter({ success: false, correlationId, err });
      throw err;
    }
  }
}
