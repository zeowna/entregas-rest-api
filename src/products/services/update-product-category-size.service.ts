import { ConflictException, Injectable } from '@nestjs/common';
import {
  AbstractEntityDto,
  AbstractUpdateEntityService,
  ID,
  NestLoggerService,
} from '../../common';
import { FindProductCategoryByNameService } from './find-product-category-by-name.service';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategorySizesTypeORMRepository } from '../repositories/product-category-sizes-typeorm.repository';
import { FindProductCategorySizeByIdService } from './find-product-category-size-by-id.service';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class UpdateProductCategorySizeService extends AbstractUpdateEntityService<ProductCategorySize> {
  constructor(
    private readonly productCategorySizesRepository: ProductCategorySizesTypeORMRepository,
    private readonly findProductCategorySizeByIdService: FindProductCategorySizeByIdService,
    private readonly findProductCategoryByNameService: FindProductCategoryByNameService,
    private readonly logger: NestLoggerService,
  ) {
    super(
      productCategorySizesRepository,
      findProductCategorySizeByIdService,
      logger,
    );
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
        `${this.productCategorySizesRepository.entityName} already exist with name: ${updateEntityDto.name}`,
      );
    }

    return super.beforeUpdate(id, updateEntityDto, correlationId, i18n);
  }
}
