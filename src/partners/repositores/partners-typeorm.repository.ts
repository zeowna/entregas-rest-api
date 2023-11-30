import { Injectable } from '@nestjs/common';
import { AbstractTypeORMRepository, ID } from '../../common';
import { Partner } from '../entities/partner.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PartnersTypeORMRepository extends AbstractTypeORMRepository<Partner> {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {
    super(partnerRepository);
  }

  async findByCnpj(cnpj: string) {
    return this.partnerRepository.findOneBy({ cnpj });
  }

  async findIdsByDistance(
    lat: number,
    lng: number,
    maxDistanceInMeters: number,
  ) {
    return this.partnerRepository
      .createQueryBuilder('p')
      .select('p.id as id')
      .innerJoin('p.address', 'a')
      .where(
        '(point(a.lat, a.lng) <@> point(:lat, :lng)) * :milesToMeters <= :maxDistanceInMeters',
        {
          lat,
          lng,
          milesToMeters: 1609.344,
          maxDistanceInMeters,
        },
      )
      .getRawMany<{ id: ID }>();
  }
}
