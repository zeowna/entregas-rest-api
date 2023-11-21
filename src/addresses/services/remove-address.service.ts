import { Injectable } from '@nestjs/common';
import { AbstractRemoveEntityService, NestLoggerService } from '../../common';
import { Address } from '../entities/address.entity';
import { AddressesTypeORMRepository } from '../repositories/addresses-typeorm-repository';
import { FindAddressByIdService } from './find-address-by-id.service';

@Injectable()
export class RemoveAddressService extends AbstractRemoveEntityService<Address> {
  constructor(
    private readonly addressesRepository: AddressesTypeORMRepository,
    private readonly findAddressByIdService: FindAddressByIdService,
    private readonly logger: NestLoggerService,
  ) {
    super(addressesRepository, findAddressByIdService, logger);
  }
}
