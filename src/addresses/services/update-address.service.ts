import { Injectable } from '@nestjs/common';
import { AbstractUpdateEntityService, NestLoggerService } from '../../common';
import { Address } from '../entities/address.entity';
import { AddressesTypeORMRepository } from '../repositories/addresses-typeorm-repository';
import { FindAddressByIdService } from './find-address-by-id.service';

@Injectable()
export class UpdateAddressService extends AbstractUpdateEntityService<Address> {
  constructor(
    private readonly addressesRepository: AddressesTypeORMRepository,
    private readonly findAddressByIdService: FindAddressByIdService,
    private readonly logger: NestLoggerService,
  ) {
    super(addressesRepository, findAddressByIdService, logger);
  }
}
