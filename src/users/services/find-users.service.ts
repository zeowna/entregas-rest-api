import { Injectable } from '@nestjs/common';
import { AbstractFindEntitiesService, NestLoggerService } from '../../common';
import { User } from '../entities/user.entity';
import { UsersTypeORMRepository } from '../repositores/users-typeorm-repository.service';
import { CountUsersService } from './count-users.service';
import { FindUsersResponse } from '../responses/find-users.response';

@Injectable()
export class FindUsersService extends AbstractFindEntitiesService<
  User,
  FindUsersResponse
> {
  constructor(
    private readonly usersRepository: UsersTypeORMRepository,
    private readonly countUsersService: CountUsersService,
    private readonly logger: NestLoggerService,
  ) {
    super(usersRepository, countUsersService, logger, FindUsersResponse);
  }
}
