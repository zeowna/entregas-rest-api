import { Module } from '@nestjs/common';
import { AddressesModule } from './entities/addresses.module';
import { AddressesTypeORMRepository } from './repositories/addresses-typeorm-repository';
import { CreateAddressService } from './services/create-address.service';
import { FindAddressByIdService } from './services/find-address-by-id.service';
import { ViaCepService } from './services/via-cep-service';
import { AddressesController } from './controllers/addresses.controller';
import { UpdateAddressService } from './services/update-address.service';
import { GeocodingService } from './services/geocoding.service';

@Module({
  imports: [AddressesModule],
  controllers: [AddressesController],
  providers: [
    AddressesTypeORMRepository,
    FindAddressByIdService,
    CreateAddressService,
    UpdateAddressService,
    ViaCepService,
    GeocodingService,
  ],
  exports: [
    AddressesTypeORMRepository,
    CreateAddressService,
    UpdateAddressService,
    FindAddressByIdService,
    GeocodingService,
  ],
})
export class AddressesHttpModule {}
