import { User } from '../entities/user.entity';
import {
  AbstractPagingDto,
  PlainQueryConditions,
  SortParams,
} from '../../common';
import { ApiProperty } from '@nestjs/swagger';

export class UserPagingDto<T extends User> extends AbstractPagingDto<T> {
  @ApiProperty({ type: String, example: '{ "id": { "eq": 1 } }' })
  conditions?: PlainQueryConditions<T>;

  @ApiProperty()
  skip?: number;

  @ApiProperty()
  limit?: number;

  @ApiProperty({ type: String, example: '{ "updatedAt": -1 }' })
  sort?: SortParams<T>;
}
