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
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  GenerateCorrelationIdInterceptor,
  PresentEntityInterceptor,
  ZeownaLoggerModule,
} from './common';
import { ZeownaAuthModule } from './common/auth';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { MeHttpModule } from './me/me-http.module';
import { AdminModule } from './admin/admin.module';

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
    ZeownaLoggerModule.register({ global: true }),
    ZeownaAuthModule.register({ global: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    AdminModule,
    UsersHttpModule,
    ProductsHttpModule,
    OrdersHttpModule,
    PartnersHttpModule,
    AddressesHttpModule,
    MediaModule,
    MeHttpModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: GenerateCorrelationIdInterceptor },
    { provide: APP_INTERCEPTOR, useClass: PresentEntityInterceptor },
    AppService,
  ],
})
export class AppModule {}
