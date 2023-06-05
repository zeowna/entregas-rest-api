import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { PartnersModule } from './partners.module';
import { PartnerProductsController } from './partner-products/partner-products.controller';
import { PartnerProductsService } from './partner-products/partner-products.service';
import { AddressesHttpModule } from '../addresses/addresses-http.module';
import { PartnersRepository } from './partners.repository';
import { PartnerProductsRepository } from './partner-products/partner-products.repository';

@Module({
  imports: [PartnersModule, AddressesHttpModule],
  controllers: [PartnersController, PartnerProductsController],
  providers: [
    PartnersService,
    PartnersRepository,
    PartnerProductsService,
    PartnerProductsRepository,
  ],
  exports: [PartnersService, PartnerProductsService],
})
export class PartnersHttpModule {}
