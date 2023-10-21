import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { ConflictException, Injectable } from '@nestjs/common';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategorySizesTypeORMRepository } from '../repositories/product-category-sizes-typeorm.repository';
import { CreateProductCategorySizeDto } from '../dto/create-product-category-size.dto';
import { FindProductCategorySizeByCategoryIdAndNameService } from './find-product-category-size-by-category-id-and-name.service';

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
  ) {
    const existing =
      await this.findProductCategorySizeByCategoryIdAndNameService.execute(
        createEntityDto.categoryId,
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
