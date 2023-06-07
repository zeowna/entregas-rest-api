import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { PartnersModule } from './partners.module';
import { PartnerProductsController } from './partner-products/partner-products.controller';
import { PartnerProductsService } from './partner-products/partner-products.service';
import { AddressesHttpModule } from '../addresses/addresses-http.module';
import { PartnersTypeORMRepository } from './partners-typeorm.repository';
import { PartnerProductsTypeORMRepository } from './partner-products/partner-products-typeorm.repository';

@Module({
  imports: [PartnersModule, AddressesHttpModule],
  controllers: [PartnersController, PartnerProductsController],
  providers: [
    PartnersService,
    PartnersTypeORMRepository,
    PartnerProductsService,
    PartnerProductsTypeORMRepository,
  ],
  exports: [PartnersService, PartnerProductsService],
})
export class PartnersHttpModule {}
