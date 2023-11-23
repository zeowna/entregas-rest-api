import { Injectable } from '@nestjs/common';
import {
  AbstractEntityDto,
  AbstractUpdateEntityService,
  ID,
  NestLoggerService,
} from '../../common';
import { Address } from '../entities/address.entity';
import { AddressesTypeORMRepository } from '../repositories/addresses-typeorm-repository';
import { FindAddressByIdService } from './find-address-by-id.service';
import { GeocodingService } from './geocoding.service';
import { I18nContext } from 'nestjs-i18n';

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
    updateEntityDto: AbstractEntityDto<T>,
    correlationId: string,
    i18n: I18nContext,
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
