import { Injectable } from '@nestjs/common';
import { AbstractCountEntitiesService, NestLoggerService } from '../../common';
import { User } from '../entities/user.entity';
import { UsersTypeORMRepository } from '../repositores/users-typeorm-repository.service';

@Injectable()
export class CountUsersService extends AbstractCountEntitiesService<User> {
  constructor(
    private readonly usersRepository: UsersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(usersRepository, logger);
  }
}
