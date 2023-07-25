import { Injectable } from '@nestjs/common';
import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { Address } from '../entities/address.entity';
import { AddressesTypeORMRepository } from '../repositories/addresses-typeorm-repository';

@Injectable()
export class CreateAddressService extends AbstractCreateEntityService<Address> {
  constructor(
    private readonly addressesRepository: AddressesTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(addressesRepository, logger);
  }
}
