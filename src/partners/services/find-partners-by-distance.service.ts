import { Injectable } from '@nestjs/common';
import { AbstractService, NestLoggerService } from '../../common';
import { FindPartnersResponse } from '../responses/find-partners.response';
import { PartnersTypeORMRepository } from '../repositores/partners-typeorm.repository';
import { FindPartnersByDistanceDto } from '../dto/find-partners-by-distance.dto';

@Injectable()
export class FindPartnersByDistanceService extends AbstractService<FindPartnersResponse> {
  constructor(
    private readonly partnersRepository: PartnersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(
    findPartnersByDistanceDto: FindPartnersByDistanceDto,
    correlationId: string,
  ) {
    this.logBefore({
      findPartnersByDistanceDto,
      correlationId,
    });

    const list = await this.partnersRepository.findByDistance(
      findPartnersByDistanceDto.coordinates.lat,
      findPartnersByDistanceDto.coordinates.lng,
      findPartnersByDistanceDto.skip,
      findPartnersByDistanceDto.limit,
      findPartnersByDistanceDto.maxDistanceInMeters || 50000,
    );

    const found = new FindPartnersResponse({
      list,
      count: 0,
      skip: findPartnersByDistanceDto.skip,
      limit: findPartnersByDistanceDto.limit,
    });

    this.logAfter({
      success: true,
      findPartnersByDistanceDto,
      found,
      correlationId,
    });

    return found;
  }
}
