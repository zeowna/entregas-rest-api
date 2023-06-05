import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { UsersHttpModule } from './users/users-http.module';
import { ProductsHttpModule } from './products/products-http.module';
import { OrdersHttpModule } from './orders/orders-http.module';
import { AddressesHttpModule } from './addresses/addresses-http.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnersHttpModule } from './partners/partners-http.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersHttpModule,
    ProductsHttpModule,
    OrdersHttpModule,
    PartnersHttpModule,
    AddressesHttpModule,
    AuthModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
