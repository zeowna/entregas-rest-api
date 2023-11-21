import { Injectable } from '@nestjs/common';
import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { Address } from '../entities/address.entity';
import { AddressesTypeORMRepository } from '../repositories/addresses-typeorm-repository';
import { GeocodingService } from './geocoding.service';
import { CreateCustomerAddressDto } from '../../customers/dto/create-customer-address.dto';

@Injectable()
export class CreateAddressService extends AbstractCreateEntityService<Address> {
  constructor(
    protected readonly addressesRepository: AddressesTypeORMRepository,
    protected readonly geocodingService: GeocodingService,
    protected readonly logger: NestLoggerService,
  ) {
    super(addressesRepository, logger);
  }

  protected async beforeCreate(
    createEntityDto: CreateCustomerAddressDto,
    correlationId: string,
  ) {
    if (!createEntityDto.lat || !createEntityDto.lng) {
      const coordinates = await this.geocodingService.execute(
        new Address(createEntityDto.toEntity()),
        correlationId,
      );

      if (coordinates) {
        createEntityDto.lat = coordinates.lat;
        createEntityDto.lng = coordinates.lng;
      }
    }
    return super.beforeCreate(createEntityDto, correlationId);
  }
}
