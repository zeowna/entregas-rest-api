import { Injectable } from '@nestjs/common';
import { AbstractFindEntitiesService, NestLoggerService } from '../../common';
import { Partner } from '../entities/partner.entity';
import { FindPartnersResponse } from '../responses/find-partners.response';
import { PartnersTypeORMRepository } from '../repositores/partners-typeorm.repository';
import { CountPartnersService } from './count-partners.service';
import { PartnerPagingDto } from '../dto/find-partiners.dto';

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

  async beforeFind(paging: PartnerPagingDto, correlationId: string) {
    if (paging.coordinates) {
      const ids = await this.partnersRepository.findIdsByDistance(
        paging.coordinates.lat,
        paging.coordinates.lng,
        50000,
      );

      paging.conditions.id = { in: ids.map(({ id }) => id) };
    }

    return paging;
  }
}
