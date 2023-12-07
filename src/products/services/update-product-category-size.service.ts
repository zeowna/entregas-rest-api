import { ConflictException, Injectable } from '@nestjs/common';
import {
  AbstractUpdateEntityService,
  ID,
  NestLoggerService,
} from '../../common';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategorySizesTypeORMRepository } from '../repositories/product-category-sizes-typeorm.repository';
import { FindProductCategorySizeByIdService } from './find-product-category-size-by-id.service';
import { I18nContext } from 'nestjs-i18n';
import { UpdateProductCategorySizeDto } from '../dto/update-product-category-size.dto';
import { FindProductCategorySizeByCategoryIdAndNameService } from './find-product-category-size-by-category-id-and-name.service';

@Injectable()
export class UpdateProductCategorySizeService extends AbstractUpdateEntityService<ProductCategorySize> {
  constructor(
    private readonly productCategorySizesRepository: ProductCategorySizesTypeORMRepository,
    private readonly findProductCategorySizeByIdService: FindProductCategorySizeByIdService,
    private readonly findProductCategorySizeByCategoryIdAndNameService: FindProductCategorySizeByCategoryIdAndNameService,
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
    updateEntityDto: UpdateProductCategorySizeDto,
    correlationId: string,
    i18n: I18nContext,
  ) {
    const existing =
      await this.findProductCategorySizeByCategoryIdAndNameService.execute(
        updateEntityDto.categoryId,
        updateEntityDto.name,
        correlationId,
      );

    if (existing && existing.id !== id) {
      throw new ConflictException(
        i18n.translate('validation.entity.exist', {
          args: {
            entityName: i18n.translate(`entity.ProductCategorySize.entityName`),
            param: i18n.translate('entity.ProductCategorySize.properties.name'),
            value: updateEntityDto.name,
          },
        }),
      );
    }

    return super.beforeUpdate(id, updateEntityDto, correlationId, i18n);
  }
}
