import { Module } from '@nestjs/common';
import { UsersHttpModule } from '../users/users-http.module';
import { CustomersController } from './controllers/customers.controller';
import { CustomerAddressesController } from './controllers/customer-addresses.controller';

@Module({
  imports: [UsersHttpModule],
  controllers: [CustomersController, CustomerAddressesController],
})
export class CustomersModule {}
