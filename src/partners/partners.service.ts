import { Injectable } from '@nestjs/common';
import { PartnersTypeORMRepository } from './partners-typeorm.repository';
import { AbstractService } from '../common/service/abstract-service.service';
import { Partner } from './entities/partner.entity';
import { AddressesService } from '../addresses/addresses.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnersService extends AbstractService<Partner> {
  constructor(
    private partnersRepository: PartnersTypeORMRepository,
    private addressesService: AddressesService,
  ) {
    super(partnersRepository);
  }

  async create(createPartnerDto: CreatePartnerDto) {
    const addressCreated = await this.addressesService.create(
      createPartnerDto.address,
    );

    return super.create({
      ...createPartnerDto,
      address: addressCreated,
    });
  }

  async update(id: number, updatePartnerDto: UpdatePartnerDto) {
    const found = await super.findById(id);

    const addressUpdated = await this.addressesService.update(
      found.address.id,
      updatePartnerDto.address,
    );

    return super.update(id, { ...updatePartnerDto, address: addressUpdated });
  }
}
