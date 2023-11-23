import { Injectable } from '@nestjs/common';
import { AbstractFindEntitiesService, NestLoggerService } from '../../common';
import { Partner } from '../entities/partner.entity';
import { FindPartnersResponse } from '../responses/find-partners.response';
import { PartnersTypeORMRepository } from '../repositores/partners-typeorm.repository';
import { CountPartnersService } from './count-partners.service';

@Injectable()
export class FindPartnersService extends AbstractFindEntitiesService<
  Partner,
  FindPartnersResponse
> {
  constructor(
    private readonly partnersRepository: PartnersTypeORMRepository,
    private readonly countPartnersService: CountPartnersService,
    private readonly logger: NestLoggerService,
  ) {
    super(
      partnersRepository,
      countPartnersService,
      logger,
      FindPartnersResponse,
    );
  }
}
