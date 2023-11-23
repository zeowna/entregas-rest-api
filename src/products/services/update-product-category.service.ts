import { ConflictException, Injectable } from '@nestjs/common';
import {
  AbstractEntityDto,
  AbstractUpdateEntityService,
  ID,
  NestLoggerService,
} from '../../common';
import { FindProductCategoryByIdService } from './find-product-category-by-id.service';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductCategoriesTypeORMRepository } from '../repositories/product-categories-typeorm.repository';
import { FindProductCategoryByNameService } from './find-product-category-by-name.service';
import { I18nContext } from 'nestjs-i18n';

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
    updateEntityDto: AbstractEntityDto<T>,
    correlationId: string,
    i18n: I18nContext,
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

    return super.beforeUpdate(id, updateEntityDto, correlationId, i18n);
  }
}
