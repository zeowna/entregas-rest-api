import { ConflictException, Injectable } from '@nestjs/common';
import {
  AbstractEntityDto,
  AbstractUpdateEntityService,
  ID,
  NestLoggerService,
} from '../../common';
import { Partner } from '../entities/partner.entity';
import { PartnersTypeORMRepository } from '../repositores/partners-typeorm.repository';
import { FindPartnerByIdService } from './find-partner-by-id.service';
import { FindPartnerByCNPJService } from './find-partner-by-cnpj.service';
import { UpdateAddressService } from '../../addresses/services/update-address.service';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class UpdatePartnerService extends AbstractUpdateEntityService<Partner> {
  constructor(
    private readonly partnersRepository: PartnersTypeORMRepository,
    private readonly findPartnerByIdService: FindPartnerByIdService,
    private readonly findPartnerByCNPJ: FindPartnerByCNPJService,
    private readonly updateAddressService: UpdateAddressService,
    private readonly logger: NestLoggerService,
  ) {
    super(partnersRepository, findPartnerByIdService, logger);
  }

  protected async beforeUpdate(
    id: ID,
    updateEntityDto: AbstractEntityDto<T>,
    correlationId: string,
    i18n: I18nContext,
  ) {
    if (!updateEntityDto.cnpj) {
      return updateEntityDto.toEntity();
    }

    const existing = await this.findPartnerByCNPJ.execute(
      updateEntityDto.cnpj,
      correlationId,
    );

    if (existing && existing.id !== id) {
      throw new ConflictException(
        `${this.partnersRepository.entityName} already exist with cnpj: ${updateEntityDto.cnpj}`,
      );
    }

    return updateEntityDto.toEntity();
  }
}
