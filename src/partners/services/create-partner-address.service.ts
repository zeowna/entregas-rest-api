import { Injectable } from '@nestjs/common';
import { Address } from '../../addresses/entities/address.entity';
import { CreatePartnerAddressDto } from '../dto/create-partner-address.dto';
import { AddressesTypeORMRepository } from '../../addresses/repositories/addresses-typeorm-repository';
import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { UpdatePartnerDto } from '../dto/update-partner.dto';
import { UpdatePartnerService } from './update-partner.service';

@Injectable()
export class CreatePartnerAddressService extends AbstractCreateEntityService<Address> {
  constructor(
    readonly addressesRepository: AddressesTypeORMRepository,
    private readonly updatePartnerService: UpdatePartnerService,
    private readonly logger: NestLoggerService,
  ) {
    super(addressesRepository, logger);
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
