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
import { I18nContext } from 'nestjs-i18n';
import { FindUserByEmailService } from './find-user-by-email.service';
import { UserTypes } from '../entities/user-types.enum';

@Injectable()
export class CreateUserService extends AbstractCreateEntityService<User> {
  constructor(
    protected readonly usersRepository: UsersTypeORMRepository,
    protected readonly findUserByCpfService: FindUserByCpfService,
    protected readonly findUserByEmailService: FindUserByEmailService,
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

  private async checkExistingCpf(
    cpf: string,
    type: UserTypes,
    correlationId: string,
    i18n: I18nContext,
  ) {
    const existing = await this.findUserByCpfService.execute(
      cpf,
      correlationId,
    );

    if (existing && existing.type === type) {
      throw new ConflictException(i18n.translate('validation.User.cpf.exists'));
    }
  }

  private async checkExistingEmail(
    cpf: string,
    correlationId: string,
    i18n: I18nContext,
  ) {
    const existing = await this.findUserByEmailService.execute(
      cpf,
      correlationId,
    );

    if (existing) {
      throw new ConflictException(
        i18n.translate('validation.User.email.exists'),
      );
    }
  }

  protected async beforeCreate(
    createUserDto: CreateUserDto,
    correlationId: string,
    i18n?: I18nContext,
  ) {
    await this.checkExistingCpf(
      createUserDto.cpf,
      createUserDto.toEntity().type,
      correlationId,
      i18n,
    );

    await this.checkExistingEmail(createUserDto.email, correlationId, i18n);

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
