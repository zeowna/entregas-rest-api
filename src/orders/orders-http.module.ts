import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersModule } from './ordersModule';
import { CartProductsService } from './cart-products/cart-products.service';
import { CartProductsController } from './cart-products/cart-products.controller';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [OrdersModule],
  controllers: [OrdersController, CartProductsController],
  providers: [OrdersService, OrdersRepository, CartProductsService],
})
export class OrdersHttpModule {}
