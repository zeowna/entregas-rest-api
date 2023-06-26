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
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PresentAbstractEntityInterceptor } from './common/interceptors/present-abstract-entity.interceptor';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'pt-*': 'pt-BR',
      },
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
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
  providers: [
    { provide: APP_INTERCEPTOR, useClass: PresentAbstractEntityInterceptor },
    AppService,
  ],
})
export class AppModule {}
