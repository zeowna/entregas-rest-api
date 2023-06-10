import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersModule } from './ordersModule';
import { CartProductsService } from './cart-products/cart-products.service';
import { CartProductsController } from './cart-products/cart-products.controller';
import { OrdersTypeORMRepository } from './orders-typeorm-repository.service';
import { CartProductsTypeORMRepository } from './cart-products/cart-products-typeorm.repository';

@Module({
  imports: [OrdersModule],
  controllers: [OrdersController, CartProductsController],
  providers: [
    OrdersService,
    OrdersTypeORMRepository,
    CartProductsService,
    CartProductsTypeORMRepository,
  ],
})
export class OrdersHttpModule {}
