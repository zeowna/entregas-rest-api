import { Injectable } from '@nestjs/common';
import { AbstractFindEntityByIdService, NestLoggerService } from '../../common';
import { Address } from '../entities/address.entity';
import { AddressesTypeORMRepository } from '../repositories/addresses-typeorm-repository';

@Injectable()
export class FindAddressByIdService extends AbstractFindEntityByIdService<Address> {
  constructor(
    private readonly addressesRepository: AddressesTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(addressesRepository, logger);
  }
}
