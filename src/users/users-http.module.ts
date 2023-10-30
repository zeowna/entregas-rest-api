import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { UsersModule } from './users.module';
import { AddressesHttpModule } from '../addresses/addresses-http.module';
import { CustomerAddressesController } from './controllers/customer-addresses.controller';
import { FindUserByEmailService } from './services/find-user-by-email.service';
import { FindUserByCpfService } from './services/find-user-by-cpf.service';
import { HashModule } from '../hash/hash.module';
import { FindUserByIdService } from './services/find-user-by-id.service';
import { FindUsersService } from './services/find-users.service';
import { CountUsersService } from './services/count-users.service';
import { UpdateUserService } from './services/update-user.service';
import { UsersTypeORMRepository } from './repositores/users-typeorm-repository.service';
import { CreateUserService } from './services/create-user.service';
import { AdminUsersController } from './controllers/admin-users.controller';

@Module({
  imports: [UsersModule, AddressesHttpModule, HashModule],
  controllers: [
    AdminUsersController,
    CustomersController,
    CustomerAddressesController,
  ],
  providers: [
    UsersTypeORMRepository,
    FindUserByEmailService,
    FindUserByCpfService,
    CountUsersService,
    FindUsersService,
    FindUserByIdService,
    CreateUserService,
    UpdateUserService,
  ],
  exports: [
    UsersTypeORMRepository,
    FindUsersService,
    FindUserByEmailService,
    FindUserByIdService,
    CreateUserService,
    UpdateUserService,
    FindUserByCpfService,
  ],
})
export class UsersHttpModule {}
