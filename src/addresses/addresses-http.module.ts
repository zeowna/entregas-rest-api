import { Module } from '@nestjs/common';
import { AddressesModule } from './entities/addresses.module';
import { AddressesTypeORMRepository } from './repositories/addresses-typeorm-repository';
import { CreateAddressService } from './services/create-address.service';
import { FindAddressByIdService } from './services/find-address-by-id.service';

@Module({
  imports: [AddressesModule],
  providers: [
    AddressesTypeORMRepository,
    FindAddressByIdService,
    CreateAddressService,
  ],
  exports: [CreateAddressService, FindAddressByIdService],
})
export class AddressesHttpModule {}
