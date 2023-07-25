import { Module } from '@nestjs/common';
import { AddressesModule } from './entities/addresses.module';
import { AddressesTypeORMRepository } from './repositories/addresses-typeorm-repository';
import { CreateAddressService } from './services/create-address.service';

@Module({
  imports: [AddressesModule],
  providers: [AddressesTypeORMRepository, CreateAddressService],
  exports: [CreateAddressService],
})
export class AddressesHttpModule {}
