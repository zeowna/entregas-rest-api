import { Injectable } from '@nestjs/common';
import { AddressesRepository } from './addresses.repository';
import { AbstractService } from '../common/service/abstract-service.service';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService extends AbstractService<Address> {
  constructor(private addressesRepository: AddressesRepository) {
    super(addressesRepository);
  }
}
