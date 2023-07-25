import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersModule } from './ordersModule';
import { CartProductsController } from './controllers/cart-products.controller';
import { OrdersTypeORMRepository } from './repositories/orders-typeorm-repository.service';
import { CartProductsTypeORMRepository } from './repositories/cart-products-typeorm.repository';

@Module({
  imports: [OrdersModule],
  controllers: [OrdersController, CartProductsController],
  providers: [OrdersTypeORMRepository, CartProductsTypeORMRepository],
})
export class OrdersHttpModule {}
