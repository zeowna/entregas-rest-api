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
import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'pt-br',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
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
