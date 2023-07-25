import { Injectable } from '@nestjs/common';
import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { Partner } from '../entities/partner.entity';
import { PartnersTypeORMRepository } from '../repositores/partners-typeorm.repository';

@Injectable()
export class CreatePartnerService extends AbstractCreateEntityService<Partner> {
  constructor(
    private readonly partnersRepository: PartnersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(partnersRepository, logger);
  }
}
