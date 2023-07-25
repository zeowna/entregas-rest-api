import { Injectable } from '@nestjs/common';
import { AbstractFindEntityByIdService, NestLoggerService } from '../../common';
import { User } from '../entities/user.entity';
import { UsersTypeORMRepository } from '../repositores/users-typeorm-repository.service';

@Injectable()
export class FindUserByIdService extends AbstractFindEntityByIdService<User> {
  constructor(
    private readonly usersRepository: UsersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(usersRepository, logger);
  }
}
