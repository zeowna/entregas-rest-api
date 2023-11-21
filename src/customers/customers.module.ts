import { Module } from '@nestjs/common';
import { UsersHttpModule } from '../users/users-http.module';
import { CustomersController } from './controllers/customers.controller';
import { CustomerAddressesController } from './controllers/customer-addresses.controller';
import { CreateCustomerAddressService } from './services/create-customer-address.service';
import { AddressesHttpModule } from '../addresses/addresses-http.module';

@Module({
  imports: [UsersHttpModule, AddressesHttpModule],
  controllers: [CustomersController, CustomerAddressesController],
  providers: [CreateCustomerAddressService],
})
export class CustomersModule {}
