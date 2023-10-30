import { Injectable } from '@nestjs/common';
import { CreateUserService } from '../../users/services/create-user.service';
import { CreatePartnerUserDto } from '../dto/create-partner-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreatePartnerUserService extends CreateUserService {
  protected async beforeCreate(
    createUserDto: CreatePartnerUserDto,
    correlationId: string,
  ) {
    const newPassword = randomUUID();

    createUserDto.password = newPassword;

    console.log({ newPassword });

    return super.beforeCreate(createUserDto, correlationId);
  }
}
