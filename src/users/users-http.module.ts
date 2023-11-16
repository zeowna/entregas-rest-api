import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { AddressesHttpModule } from '../addresses/addresses-http.module';
import { FindUserByEmailService } from './services/find-user-by-email.service';
import { FindUserByCpfService } from './services/find-user-by-cpf.service';
import { HashModule } from '../hash/hash.module';
import { FindUserByIdService } from './services/find-user-by-id.service';
import { FindUsersService } from './services/find-users.service';
import { CountUsersService } from './services/count-users.service';
import { UpdateUserService } from './services/update-user.service';
import { UsersTypeORMRepository } from './repositores/users-typeorm-repository.service';
import { CreateUserService } from './services/create-user.service';
import { UploadUserProfilePictureService } from './services/upload-user-profile-picture.service';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [UsersModule, AddressesHttpModule, HashModule, MailerModule],
  controllers: [],
  providers: [
    UsersTypeORMRepository,
    FindUserByEmailService,
    FindUserByCpfService,
    CountUsersService,
    FindUsersService,
    FindUserByIdService,
    CreateUserService,
    UpdateUserService,
    UploadUserProfilePictureService,
  ],
  exports: [
    UsersTypeORMRepository,
    FindUsersService,
    FindUserByEmailService,
    FindUserByIdService,
    CreateUserService,
    UpdateUserService,
    FindUserByCpfService,
    UploadUserProfilePictureService,
  ],
})
export class UsersHttpModule {}
