import { ApiProperty } from '@nestjs/swagger';
import { AbstractFindEntitiesResponse } from '../../common';
import { Product } from '../entities/product.entity';
import { ProductResponse } from './product.response';

export class FindProductResponse extends AbstractFindEntitiesResponse<Product> {
  @ApiProperty({ type: () => [ProductResponse] })
  readonly list: Product[];

  @ApiProperty()
  readonly count: number;

  @ApiProperty()
  readonly skip: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly pages: number;
}
