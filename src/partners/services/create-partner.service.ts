import { ConflictException, Injectable } from '@nestjs/common';
import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { Partner } from '../entities/partner.entity';
import { PartnersTypeORMRepository } from '../repositores/partners-typeorm.repository';
import { CreateAddressService } from '../../addresses/services/create-address.service';
import { FindPartnerByCNPJService } from './find-partner-by-cnpj.service';
import { CreatePartnerDto } from '../dto/create-partner.dto';

@Injectable()
export class CreatePartnerService extends AbstractCreateEntityService<Partner> {
  constructor(
    private readonly partnersRepository: PartnersTypeORMRepository,
    private readonly findPartnerByCNPJ: FindPartnerByCNPJService,
    private readonly createAddressService: CreateAddressService,
    private readonly logger: NestLoggerService,
  ) {
    super(partnersRepository, logger);
  }

  protected async beforeCreate(
    createEntityDto: CreatePartnerDto,
    correlationId: string,
  ) {
    const existing = await this.findPartnerByCNPJ.execute(
      createEntityDto.cnpj,
      correlationId,
    );

    if (existing) {
      throw new ConflictException(
        `${this.partnersRepository.entityName} already exist with cnpj: ${createEntityDto.cnpj}`,
      );
    }

    const address = await this.createAddressService.execute(
      createEntityDto.address,
      correlationId,
    );

    createEntityDto.addressId = address.id;

    return super.beforeCreate(createEntityDto, correlationId);
  }
}
