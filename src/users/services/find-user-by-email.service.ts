import { Injectable } from '@nestjs/common';
import { AbstractService, NestLoggerService } from '../../common';
import { User } from '../entities/user.entity';
import { UsersTypeORMRepository } from '../repositores/users-typeorm-repository.service';

@Injectable()
export class FindUserByEmailService extends AbstractService<User> {
  constructor(
    private readonly usersRepository: UsersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(email: string, correlationId?: string) {
    try {
      this.logBefore({ cpf: email, correlationId });

      const found = await this.usersRepository.findByEmail(email);

      this.logAfter({ success: true, found, correlationId });

      return found;
    } catch (err) {
      this.logAfter({ success: false, correlationId, err });
      throw err;
    }
  }
}
