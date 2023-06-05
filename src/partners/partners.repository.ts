import { Injectable } from '@nestjs/common';
import { AbstractTypeORMRepository } from '../common/repository/abstract-typeorm.repository';
import { Partner } from './entities/partner.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PartnersRepository extends AbstractTypeORMRepository<Partner> {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {
    super(partnerRepository);
  }
}
