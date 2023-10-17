import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { ConflictException, Injectable } from '@nestjs/common';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductCategoriesTypeORMRepository } from '../repositories/product-categories-typeorm.repository';
import { FindProductCategoryByNameService } from './find-product-category-by-name.service';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';

@Injectable()
export class CreateProductCategoryService extends AbstractCreateEntityService<ProductCategory> {
  constructor(
    protected readonly productCategoriesRepository: ProductCategoriesTypeORMRepository,
    private readonly findProductCategoryByNameService: FindProductCategoryByNameService,
    protected readonly logger: NestLoggerService,
  ) {
    super(productCategoriesRepository, logger);
  }

  protected async beforeCreate(
    createEntityDto: CreateProductCategoryDto,
    correlationId: string,
  ) {
    const existing = await this.findProductCategoryByNameService.execute(
      createEntityDto.name,
      correlationId,
    );

    if (existing) {
      throw new ConflictException(
        `${this.productCategoriesRepository.entityName} already exist with name: ${createEntityDto.name}`,
      );
    }

    return super.beforeCreate(createEntityDto, correlationId);
  }
}
