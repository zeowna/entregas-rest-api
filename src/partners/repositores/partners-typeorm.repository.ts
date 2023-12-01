import { Injectable } from '@nestjs/common';
import { AbstractTypeORMRepository } from '../../common';
import { Partner } from '../entities/partner.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { PartnerStatus } from '../entities/partner.status';

@Injectable()
export class PartnersTypeORMRepository extends AbstractTypeORMRepository<Partner> {
  private readonly distanceSQL = `
      WITH partnerDistance as (
        SELECT p.id, (point(a.lat, a.lng) <@> point($1, $2)) * 1609.344 as distance 
        FROM partner p 
        INNER JOIN address a 
        ON p.address_id = a.id
        WHERE 
           (point(a.lat, a.lng) <@> point($1,  $2)) * 1609.344 <= $3
           AND p.status = '${PartnerStatus.Active}' 
           AND p.is_online = 'true'
        )
        SELECT pd.id FROM partnerDistance pd ORDER BY distance ASC OFFSET $4 LIMIT $5
      `;

  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    super(partnerRepository);
  }

  async findByCnpj(cnpj: string) {
    return this.partnerRepository.findOneBy({ cnpj });
  }

  async findByDistance(
    lat: number,
    lng: number,
    skip: number,
    limit: number,
    maxDistanceInMeters: number,
  ) {
    const result = await this.dataSource.query(this.distanceSQL, [
      lat,
      lng,
      maxDistanceInMeters,
      skip,
      limit,
    ]);

    console.log(result);

    return Promise.all(result.map(async ({ id }) => this.findById(id)));
  }
}
