import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { ProductsHttpModule } from '../products/products-http.module';
import { PartnersHttpModule } from '../partners/partners-http.module';
import { AddressesHttpModule } from '../addresses/addresses-http.module';

@Module({
  imports: [ProductsHttpModule, AddressesHttpModule, PartnersHttpModule],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
