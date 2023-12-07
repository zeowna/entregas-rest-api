import { forwardRef, Module } from '@nestjs/common';
import { OrdersModule } from './orders.module';
import { OrdersTypeORMRepository } from './repositories/orders-typeorm.repository';
import { CartProductsTypeORMRepository } from './repositories/cart-products-typeorm.repository';
import { CreateOrderService } from './services/create-order.service';
import { FindOrderByIdService } from './services/find-order-by-id.service';
import { UsersHttpModule } from '../users/users-http.module';
import { PartnersHttpModule } from '../partners/partners-http.module';
import { AddressesHttpModule } from '../addresses/addresses-http.module';
import { FindCartProductByIdService } from './services/find-cart-product-by-id.service';
import { UpdateOrderService } from './services/update-order.service';
import { CreateCartProductsService } from './services/create-cart-products.service';
import { FindOrdersService } from './services/find-orders.service';
import { CountOrdersService } from './services/count-orders.service';
import { CreateCartProductService } from './services/create-cart-product.service';
import { UpdateOrderStatusService } from './services/update-order-status.service';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    OrdersModule,
    UsersHttpModule,
    forwardRef(() => PartnersHttpModule),
    AddressesHttpModule,
    MailerModule,
  ],
  controllers: [],
  providers: [
    OrdersTypeORMRepository,
    CartProductsTypeORMRepository,
    FindOrderByIdService,
    CreateOrderService,
    UpdateOrderService,
    FindCartProductByIdService,
    CreateCartProductService,
    CreateCartProductsService,
    FindOrdersService,
    CountOrdersService,
    UpdateOrderStatusService,
  ],
  exports: [
    CreateOrderService,
    UpdateOrderService,
    CreateCartProductsService,
    FindOrdersService,
    FindOrderByIdService,
    UpdateOrderStatusService,
  ],
})
export class OrdersHttpModule {}
