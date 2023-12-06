import { ApiProperty } from '@nestjs/swagger';
import {
  AbstractPagingDto,
  PlainQueryConditions,
  SortParams,
} from '../../common';
import { ProductCategorySize } from '../entities/product-category-size.entity';

export class ProductCategorySizePagingDto extends AbstractPagingDto<ProductCategorySize> {
  @ApiProperty({ type: String, example: '{ "id": { "eq": 1 } }' })
  conditions?: PlainQueryConditions<ProductCategorySize>;

  @ApiProperty()
  skip?: number;

  @ApiProperty()
  limit?: number;

  @ApiProperty({ type: String, example: '{ "updatedAt": -1 }' })
  sort?: SortParams<ProductCategorySize>;
}
