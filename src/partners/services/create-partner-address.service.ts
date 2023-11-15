import { Injectable } from '@nestjs/common';
import { Address } from '../../addresses/entities/address.entity';
import { CreatePartnerAddressDto } from '../dto/create-partner-address.dto';
import { AddressesTypeORMRepository } from '../../addresses/repositories/addresses-typeorm-repository';
import { NestLoggerService } from '../../common';
import { UpdatePartnerDto } from '../dto/update-partner.dto';
import { UpdatePartnerService } from './update-partner.service';
import { CreateAddressService } from '../../addresses/services/create-address.service';
import { GeocodingService } from '../../addresses/services/geocoding.service';

@Injectable()
export class CreatePartnerAddressService extends CreateAddressService {
  constructor(
    protected readonly addressesRepository: AddressesTypeORMRepository,
    protected readonly geocodingService: GeocodingService,
    private readonly updatePartnerService: UpdatePartnerService,
    protected readonly logger: NestLoggerService,
  ) {
    super(addressesRepository, geocodingService, logger);
  }

  protected async afterCreate(
    createEntityDto: CreatePartnerAddressDto,
    entity: Address,
    correlationId: string,
  ) {
    await this.updatePartnerService.execute(
      createEntityDto.partnerId,
      new UpdatePartnerDto({
        addressId: entity.id,
      }),
      correlationId,
    );
  }
}
