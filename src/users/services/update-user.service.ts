import { Injectable } from '@nestjs/common';
import { AbstractUpdateEntityService, NestLoggerService } from '../../common';
import { User } from '../entities/user.entity';
import { UsersTypeORMRepository } from '../repositores/users-typeorm-repository.service';
import { FindUserByIdService } from './find-user-by-id.service';

@Injectable()
export class UpdateUserService extends AbstractUpdateEntityService<User> {
  constructor(
    private readonly usersRepository: UsersTypeORMRepository,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly logger: NestLoggerService,
  ) {
    super(usersRepository, findUserByIdService, logger);
  }
}
