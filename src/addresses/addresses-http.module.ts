import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesModule } from './entities/addresses.module';
import { AddressesTypeORMRepository } from './addresses-typeorm-repository';

@Module({
  imports: [AddressesModule],
  providers: [AddressesService, AddressesTypeORMRepository],
  exports: [AddressesService],
})
export class AddressesHttpModule {}
