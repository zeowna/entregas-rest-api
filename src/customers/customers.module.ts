import { Module } from '@nestjs/common';
import { UsersHttpModule } from '../users/users-http.module';
import { CustomersController } from './controllers/customers.controller';
import { CustomerAddressesController } from './controllers/customer-addresses.controller';
import { CreateCustomerAddressService } from './services/create-customer-address.service';
import { AddressesHttpModule } from '../addresses/addresses-http.module';
import { CustomersOrdersController } from './controllers/customers-orders.controller';
import { OrdersHttpModule } from '../orders/orders-http.module';
import { CreateOrderAddress } from '../orders/services/create-order-address';

@Module({
  imports: [UsersHttpModule, AddressesHttpModule, OrdersHttpModule],
  controllers: [
    CustomersController,
    CustomerAddressesController,
    CustomersOrdersController,
  ],
  providers: [CreateCustomerAddressService, CreateOrderAddress],
})
export class CustomersModule {}
