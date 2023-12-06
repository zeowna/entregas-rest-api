import { ApiProperty } from '@nestjs/swagger';
import {
  AbstractPagingDto,
  PlainQueryConditions,
  SortParams,
} from '../../common';
import { Product } from '../entities/product.entity';

export class ProductPagingDto extends AbstractPagingDto<Product> {
  @ApiProperty({ type: String, example: '{ "id": { "eq": 1 } }' })
  conditions?: PlainQueryConditions<Product>;

  @ApiProperty()
  skip?: number;

  @ApiProperty()
  limit?: number;

  @ApiProperty({ type: String, example: '{ "updatedAt": -1 }' })
  sort?: SortParams<Product>;
}
