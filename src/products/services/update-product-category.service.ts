import { ConflictException, Injectable } from '@nestjs/common';
import {
  AbstractUpdateEntityService,
  ID,
  NestLoggerService,
} from '../../common';
import { FindProductCategoryByIdService } from './find-product-category-by-id.service';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductCategoriesTypeORMRepository } from '../repositories/product-categories-typeorm.repository';
import { FindProductCategoryByNameService } from './find-product-category-by-name.service';
import { UpdateProductCategoryDto } from '../dto/update-product-category.dto';

@Injectable()
export class UpdateProductCategoryService extends AbstractUpdateEntityService<ProductCategory> {
  constructor(
    private readonly productCategoriesRepository: ProductCategoriesTypeORMRepository,
    private readonly findProductCategoryByIdService: FindProductCategoryByIdService,
    private readonly findProductCategoryByNameService: FindProductCategoryByNameService,
    private readonly logger: NestLoggerService,
  ) {
    super(productCategoriesRepository, findProductCategoryByIdService, logger);
  }

  protected async beforeUpdate(
    id: ID,
    updateEntityDto: UpdateProductCategoryDto,
    correlationId: string,
  ) {
    const existing = await this.findProductCategoryByNameService.execute(
      updateEntityDto.name,
      correlationId,
    );

    if (existing && existing.id !== id) {
      throw new ConflictException(
        `${this.productCategoriesRepository.entityName} already exist with name: ${updateEntityDto.name}`,
      );
    }

    return super.beforeUpdate(id, updateEntityDto, correlationId);
  }
}