import {
  AbstractCreateEntityService,
  ExcludeMethods,
  NestLoggerService,
} from '../../common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { BcryptHashService } from '../../hash/services/bcrypt-hash.service';
import { UsersTypeORMRepository } from '../repositores/users-typeorm-repository.service';
import { AdminUser } from '../entities/admin-user.entity';
import { PartnerUser } from '../entities/partner-user.entity';
import { CustomerUser } from '../entities/customer-user.entity';

@Injectable()
export class CreateUserService extends AbstractCreateEntityService<User> {
  constructor(
    protected readonly usersRepository: UsersTypeORMRepository,
    protected readonly hashService: BcryptHashService,
    protected readonly logger: NestLoggerService,
  ) {
    super(usersRepository, logger);
  }

  private async hashPassword(password: string) {
    return this.hashService.hashPassword(password);
  }

  private buildEntity<T extends User>(entity: T, props: ExcludeMethods<T>) {
    if (entity instanceof AdminUser) {
      return new AdminUser({ ...entity, ...props });
    }

    if (entity instanceof PartnerUser) {
      return new PartnerUser({ ...entity, ...props });
    }

    if (entity instanceof CustomerUser) {
      return new CustomerUser({ ...entity, ...props });
    }
  }

  protected async beforeCreate(createUserDto: CreateUserDto) {
    return this.buildEntity(createUserDto.toEntity(), {
      password: await this.hashPassword(createUserDto.password),
    });
  }
}
