import { forwardRef, Module } from '@nestjs/common';
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
import { PartnerUsersController } from './controllers/partner-users.controller';
import { UsersHttpModule } from '../users/users-http.module';
import { PartnerUsersTypeORMRepository } from './repositores/partner-users-typeorm.repository';
import { UsersModule } from '../users/users.module';
import { CreatePartnerAddressService } from './services/create-partner-address.service';
import { PartnerAddressesController } from './controllers/partner-addresses.controller';
import { CreatePartnerUserService } from './services/create-partner-user.service';
import { HashModule } from '../hash/hash.module';
import { UpdateAllPartnerProductsStatusByProductService } from './services/update-all-partner-products-status-by-product.service';
import { MailerModule } from '../mailer/mailer.module';
import { PartnerOrdersController } from './controllers/partner-orders.controller';
import { OrdersHttpModule } from '../orders/orders-http.module';

@Module({
  imports: [
    HashModule,
    PartnersModule,
    UsersModule,
    UsersHttpModule,
    AddressesHttpModule,
    MailerModule,
    forwardRef(() => OrdersHttpModule),
  ],
  controllers: [
    PartnersController,
    PartnerAddressesController,
    PartnerUsersController,
    PartnerProductsController,
    PartnerOrdersController,
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
    CreatePartnerAddressService,
    CreatePartnerUserService,
    UpdateAllPartnerProductsStatusByProductService,
  ],
  exports: [
    CreatePartnerService,
    CreatePartnerProductService,
    FindPartnerByIdService,
    FindPartnerProductByIdService,
    UpdatePartnerProductService,
    UpdateAllPartnerProductsStatusByProductService,
  ],
})
export class PartnersHttpModule {}
