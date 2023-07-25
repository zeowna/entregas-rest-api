import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UsersTypeORMRepository } from '../repositores/users-typeorm-repository.service';
import { AbstractService, NestLoggerService } from '../../common';

@Injectable()
export class FindUserByCpfService extends AbstractService<User> {
  constructor(
    private readonly usersRepository: UsersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(cpf: string, correlationId?: string) {
    try {
      this.logBefore({ cpf, correlationId });

      const found = await this.usersRepository.findByCpf(cpf);

      this.logAfter({ success: true, found, correlationId });

      return found;
    } catch (err) {
      this.logAfter({ success: false, correlationId, err });
      throw err;
    }
  }
}
