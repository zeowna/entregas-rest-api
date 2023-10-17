import { Injectable } from '@nestjs/common';
import { AbstractService, NestLoggerService } from '../../common';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductCategoriesTypeORMRepository } from '../repositories/product-categories-typeorm.repository';

@Injectable()
export class FindProductCategoryByNameService extends AbstractService<ProductCategory> {
  constructor(
    private readonly productCategoriesRepository: ProductCategoriesTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(name: string, correlationId: string) {
    this.logBefore({
      name,
      correlationId,
    });

    const found = await this.productCategoriesRepository.findByName(name);

    this.logAfter({
      name,
      correlationId,
    });

    return found;
  }
}
