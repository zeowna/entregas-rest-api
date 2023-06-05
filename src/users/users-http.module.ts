import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { AddressesHttpModule } from '../addresses/addresses-http.module';
import { UsersRepository } from './users.repository';
import { UserAddressesController } from './addresses/user-addresses.controller';
import { UserAddressService } from './addresses/user-address.service';
import { BcryptHashService } from './hash/bcrypt-hash.service';

@Module({
  imports: [UsersModule, AddressesHttpModule],
  controllers: [UsersController, UserAddressesController],
  providers: [
    UsersRepository,
    UsersService,
    UserAddressService,
    BcryptHashService,
  ],
  exports: [UsersService, BcryptHashService],
})
export class UsersHttpModule {}
