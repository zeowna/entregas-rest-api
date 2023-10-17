import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersModule } from './ordersModule';
import { CartProductsController } from './controllers/cart-products.controller';
import { OrdersTypeORMRepository } from './repositories/orders-typeorm-repository.service';
import { CartProductsTypeORMRepository } from './repositories/cart-products-typeorm.repository';
import { CreateOrderService } from './services/create-order.service';
import { FindOrderByIdService } from './services/find-order-by-id.service';
import { CreateCartProductService } from './services/create-cart-product.service';
import { UsersHttpModule } from '../users/users-http.module';
import { PartnersHttpModule } from '../partners/partners-http.module';
import { AddressesHttpModule } from '../addresses/addresses-http.module';
import { UpdateCartProductService } from './services/update-cart-product.service';
import { FindCartProductByIdService } from './services/find-cart-product-by-id.service';
import { RemoveCartProductService } from './services/remove-cart-product.service';

@Module({
  imports: [
    OrdersModule,
    UsersHttpModule,
    PartnersHttpModule,
    AddressesHttpModule,
  ],
  controllers: [OrdersController, CartProductsController],
  providers: [
    OrdersTypeORMRepository,
    CartProductsTypeORMRepository,
    FindOrderByIdService,
    CreateOrderService,
    FindCartProductByIdService,
    CreateCartProductService,
    UpdateCartProductService,
    RemoveCartProductService,
  ],
})
export class OrdersHttpModule {}
