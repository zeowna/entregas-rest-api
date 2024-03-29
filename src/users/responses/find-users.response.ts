import { ApiProperty } from '@nestjs/swagger';
import { AbstractFindEntitiesResponse } from '../../common';
import { User } from '../entities/user.entity';
import { UserResponse } from './user.response';

export class FindUsersResponse extends AbstractFindEntitiesResponse<User> {
  @ApiProperty({ type: () => [UserResponse] })
  readonly list: User[];

  @ApiProperty()
  readonly count: number;

  @ApiProperty()
  readonly skip: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly pages: number;
}
