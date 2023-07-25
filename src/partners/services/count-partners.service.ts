import { Injectable } from '@nestjs/common';
import { AbstractCountEntitiesService, NestLoggerService } from '../../common';
import { Partner } from '../entities/partner.entity';
import { PartnersTypeORMRepository } from '../repositores/partners-typeorm.repository';

@Injectable()
export class CountPartnersService extends AbstractCountEntitiesService<Partner> {
  constructor(
    private readonly partnersRepository: PartnersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(partnersRepository, logger);
  }
}
