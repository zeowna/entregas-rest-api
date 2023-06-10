import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { AddressesHttpModule } from '../addresses/addresses-http.module';
import { UsersTypeORMRepository } from './users-typeorm.repository';
import { UserAddressesController } from './addresses/user-addresses.controller';
import { UserAddressService } from './addresses/user-address.service';
import { BcryptHashService } from './hash/bcrypt-hash.service';
import { IsUserEmailAlreadyInUse } from './dto/is-user-email-already-in-use.validation';
import { IsUserCpfAlreadyInUse } from './dto/is-user-cpf-already-in-use.validation';

@Module({
  imports: [UsersModule, AddressesHttpModule],
  controllers: [UsersController, UserAddressesController],
  providers: [
    UsersTypeORMRepository,
    UsersService,
    UserAddressService,
    BcryptHashService,
    IsUserEmailAlreadyInUse,
    IsUserCpfAlreadyInUse,
  ],
  exports: [UsersService, BcryptHashService],
})
export class UsersHttpModule {}
