import { Injectable } from '@nestjs/common';
import { CreateUserService } from '../../users/services/create-user.service';
import { CreatePartnerUserDto } from '../dto/create-partner-user.dto';
import { randomUUID } from 'crypto';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/entities/user.entity';
import { readFile } from 'fs/promises';

@Injectable()
export class CreatePartnerUserService extends CreateUserService {
  protected async beforeCreate(
    createUserDto: CreatePartnerUserDto,
    correlationId: string,
  ) {
    const uuid = randomUUID();

    const newPassword = uuid.substring(0, uuid.indexOf('-') - 1);

    createUserDto.password = newPassword;

    return super.beforeCreate(createUserDto, correlationId);
  }

  protected async afterCreate(
    createEntityDto: CreateUserDto,
    entity: User,
    correlationId: string,
  ): Promise<void> {
    const template = await readFile(
      `${process.cwd()}/media/templates/welcome-user-with-password.html`,
      'utf-8',
    );

    await this.sendEmailService.execute(
      entity.email,
      'Bem-vindo ao Entregas',
      template,
      { userName: entity.name, newPassword: createEntityDto.password },
      correlationId,
    );
  }
}
