import {
  AbstractCreateEntityService,
  ExcludeMethods,
  NestLoggerService,
} from '../../common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { BcryptHashService } from '../../hash/services/bcrypt-hash.service';
import { UsersTypeORMRepository } from '../repositores/users-typeorm-repository.service';
import { AdminUser } from '../entities/admin-user.entity';
import { PartnerUser } from '../entities/partner-user.entity';
import { CustomerUser } from '../entities/customer-user.entity';
import { FindUserByCpfService } from './find-user-by-cpf.service';
import { SendEmailService } from '../../mailer/services/send-email.service';
import { readFile } from 'fs/promises';

@Injectable()
export class CreateUserService extends AbstractCreateEntityService<User> {
  constructor(
    protected readonly usersRepository: UsersTypeORMRepository,
    protected readonly findUserByCpfService: FindUserByCpfService,
    protected readonly hashService: BcryptHashService,
    protected readonly sendEmailService: SendEmailService,
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

  protected async beforeCreate(
    createUserDto: CreateUserDto,
    correlationId: string,
  ) {
    const existing = await this.findUserByCpfService.execute(
      createUserDto.cpf,
      correlationId,
    );

    if (existing) {
      throw new ConflictException(
        `${this.usersRepository.entityName} already exist with cpf: ${createUserDto.cpf}`,
      );
    }

    return this.buildEntity(createUserDto.toEntity(), {
      password: await this.hashPassword(createUserDto.password),
    });
  }

  protected async afterCreate(
    createEntityDto: CreateUserDto,
    entity: User,
    correlationId: string,
  ) {
    const template = await readFile(
      `${process.cwd()}/media/templates/welcome-user.html`,
      'utf-8',
    );

    await this.sendEmailService.execute(
      entity.email,
      'Bem-vindo ao Entregas',
      template,
      { userName: entity.name },
      correlationId,
    );

    return super.afterCreate(createEntityDto, entity, correlationId);
  }
}
