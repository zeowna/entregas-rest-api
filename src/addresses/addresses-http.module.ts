import { Module } from '@nestjs/common';
import { AddressesModule } from './entities/addresses.module';
import { AddressesTypeORMRepository } from './repositories/addresses-typeorm-repository';
import { CreateAddressService } from './services/create-address.service';
import { FindAddressByIdService } from './services/find-address-by-id.service';
import { ViaCepService } from './services/via-cep-service';
import { AddressesController } from './controllers/addresses.controller';

@Module({
  imports: [AddressesModule],
  controllers: [AddressesController],
  providers: [
    AddressesTypeORMRepository,
    FindAddressByIdService,
    CreateAddressService,
    ViaCepService,
  ],
  exports: [CreateAddressService, FindAddressByIdService],
})
export class AddressesHttpModule {}
