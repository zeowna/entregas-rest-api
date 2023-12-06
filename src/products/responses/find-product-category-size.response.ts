import { ApiProperty } from '@nestjs/swagger';
import { AbstractFindEntitiesResponse } from '../../common';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategorySizeResponse } from './product-category-size.response';

export class FindProductCategorySizeResponse extends AbstractFindEntitiesResponse<ProductCategorySize> {
  @ApiProperty({ type: ProductCategorySizeResponse })
  readonly list: ProductCategorySize[];

  @ApiProperty()
  readonly count: number;

  @ApiProperty()
  readonly skip: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly pages: number;
}
