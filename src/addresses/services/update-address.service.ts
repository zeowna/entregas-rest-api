import { Injectable } from '@nestjs/common';
import {
  AbstractUpdateEntityService,
  ID,
  NestLoggerService,
} from '../../common';
import { Address } from '../entities/address.entity';
import { AddressesTypeORMRepository } from '../repositories/addresses-typeorm-repository';
import { FindAddressByIdService } from './find-address-by-id.service';
import { GeocodingService } from './geocoding.service';
import { UpdateAddressDto } from '../dto/update-address.dto';

@Injectable()
export class UpdateAddressService extends AbstractUpdateEntityService<Address> {
  constructor(
    private readonly addressesRepository: AddressesTypeORMRepository,
    private readonly findAddressByIdService: FindAddressByIdService,
    private readonly geocodingService: GeocodingService,
    private readonly logger: NestLoggerService,
  ) {
    super(addressesRepository, findAddressByIdService, logger);
  }

  protected async beforeUpdate(
    id: ID,
    updateEntityDto: UpdateAddressDto,
    correlationId: string,
  ) {
    console.log('here');

    const coordinates = await this.geocodingService.execute(
      new Address(updateEntityDto.toEntity()),
      correlationId,
    );

    if (coordinates) {
      updateEntityDto.lat = coordinates.lat;
      updateEntityDto.lng = coordinates.lng;
    }

    return updateEntityDto.toEntity();
  }
}
