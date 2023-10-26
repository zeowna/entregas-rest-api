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
import { FindPartnerByCNPJService } from './services/find-partner-by-cnpj.service';
import { UpdatePartnerService } from './services/update-partner.service';
import { UploadPartnerPictureService } from './services/upload-partner-picture.service';
import {
  FindPartnerUserByPartnerId,
  PartnerUsersController,
} from './controllers/partner-users.controller';
import { UsersHttpModule } from '../users/users-http.module';
import { PartnerUsersTypeORMRepository } from './repositores/partner-users-typeorm.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PartnersModule, UsersModule, UsersHttpModule, AddressesHttpModule],
  controllers: [
    PartnersController,
    PartnerUsersController,
    PartnerProductsController,
  ],
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
    FindPartnerByCNPJService,
    UpdatePartnerService,
    UploadPartnerPictureService,
    PartnerUsersTypeORMRepository,
    FindPartnerUserByPartnerId,
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
