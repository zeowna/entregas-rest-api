import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { ConflictException, Injectable } from '@nestjs/common';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategorySizesTypeORMRepository } from '../repositories/product-category-sizes-typeorm.repository';
import { CreateProductCategorySizeDto } from '../dto/create-product-category-size.dto';
import { FindProductCategorySizeByCategoryIdAndNameService } from './find-product-category-size-by-category-id-and-name.service';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class CreateProductCategorySizeService extends AbstractCreateEntityService<ProductCategorySize> {
  constructor(
    protected readonly productCategoriesRepository: ProductCategorySizesTypeORMRepository,
    private readonly findProductCategorySizeByCategoryIdAndNameService: FindProductCategorySizeByCategoryIdAndNameService,
    protected readonly logger: NestLoggerService,
  ) {
    super(productCategoriesRepository, logger);
  }

  protected async beforeCreate(
    createEntityDto: CreateProductCategorySizeDto,
    correlationId: string,
    i18n: I18nContext,
  ) {
    const existing =
      await this.findProductCategorySizeByCategoryIdAndNameService.execute(
        createEntityDto.categoryId,
        createEntityDto.name,
        correlationId,
      );

    if (existing) {
      throw new ConflictException(
        i18n.translate('validation.entity.exist', {
          args: {
            entityName: i18n.translate(`entity.ProductCategorySize.entityName`),
            param: i18n.translate('entity.ProductCategorySize.properties.name'),
            value: createEntityDto.name,
          },
        }),
      );
    }

    return super.beforeCreate(createEntityDto, correlationId);
  }
}
