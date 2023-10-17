import { Module } from '@nestjs/common';
import { PartnersController } from './controllers/partners.controller';
import { PartnersModule } from './partners.module';
import { PartnerProductsController } from './controllers/partner-products.controller';
import { AddressesHttpModule } from '../addresses/addresses-http.module';
import { PartnersTypeORMRepository } from './repositores/partners-typeorm.repository';
import { CountPartnersService } from './services/count-partners.service';
import { FindPartnersService } from './services/find-partners.service';
import { CreatePartnerService } from './services/create-partner.service';
import { CreatePartnerProductService } from './services/create-partner-product.service';
import { PartnerProductsTypeORMRepository } from './repositores/partner-products-typeorm.repository';
import { CountPartnerProductsService } from './services/count-partner-products.service';
import { FindPartnerProductsService } from './services/find-partner-products.service';
import { FindPartnerByIdService } from './services/find-partner-by-id.service';
import { FindPartnerProductByIdService } from './services/find-partner-product-by-id.service';
import { UpdatePartnerProductService } from './services/update-partner-product.service';

@Module({
  imports: [PartnersModule, AddressesHttpModule],
  controllers: [PartnersController, PartnerProductsController],
  providers: [
    PartnersTypeORMRepository,
    PartnerProductsTypeORMRepository,
    CountPartnersService,
    FindPartnersService,
    FindPartnerByIdService,
    CreatePartnerService,
    CreatePartnerProductService,
    CountPartnerProductsService,
    FindPartnerProductsService,
    FindPartnerProductByIdService,
    UpdatePartnerProductService,
  ],
  exports: [
    CreatePartnerService,
    CreatePartnerProductService,
    FindPartnerByIdService,
    FindPartnerProductByIdService,
    UpdatePartnerProductService,
  ],
})
export class PartnersHttpModule {}
