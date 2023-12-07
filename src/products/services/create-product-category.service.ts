import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { ConflictException, Injectable } from '@nestjs/common';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductCategoriesTypeORMRepository } from '../repositories/product-categories-typeorm.repository';
import { FindProductCategoryByNameService } from './find-product-category-by-name.service';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { I18nContext } from 'nestjs-i18n';

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
    i18n: I18nContext,
  ) {
    const existing = await this.findProductCategoryByNameService.execute(
      createEntityDto.name,
      correlationId,
    );

    if (existing) {
      throw new ConflictException(
        i18n.translate('validation.entity.exist', {
          args: {
            entityName: i18n.translate(`entity.ProductCategory.entityName`),
            param: i18n.translate('entity.ProductCategory.properties.name'),
            value: createEntityDto.name,
          },
        }),
      );
    }

    return super.beforeCreate(createEntityDto, correlationId);
  }
}
