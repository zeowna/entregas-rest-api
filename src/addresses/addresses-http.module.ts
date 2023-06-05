import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesModule } from './entities/addresses.module';
import { AddressesRepository } from './addresses.repository';

@Module({
  imports: [AddressesModule],
  providers: [AddressesService, AddressesRepository],
  exports: [AddressesService],
})
export class AddressesHttpModule {}
