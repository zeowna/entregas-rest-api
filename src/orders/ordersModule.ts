import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CartProduct } from './cart-products/entities/cart-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, CartProduct])],
  exports: [TypeOrmModule],
})
export class OrdersModule {}
