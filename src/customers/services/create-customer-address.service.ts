import { Injectable } from '@nestjs/common';
import { AddressesTypeORMRepository } from '../../addresses/repositories/addresses-typeorm-repository';
import { NestLoggerService } from '../../common';
import { CreateAddressService } from '../../addresses/services/create-address.service';
import { GeocodingService } from '../../addresses/services/geocoding.service';

@Injectable()
export class CreateCustomerAddressService extends CreateAddressService {
  constructor(
    protected readonly addressesRepository: AddressesTypeORMRepository,
    protected readonly geocodingService: GeocodingService,
    protected readonly logger: NestLoggerService,
  ) {
    super(addressesRepository, geocodingService, logger);
  }
}
