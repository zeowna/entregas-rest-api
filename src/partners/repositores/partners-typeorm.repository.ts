import { Injectable } from '@nestjs/common';
import { AbstractTypeORMRepository } from '../../common';
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
}
