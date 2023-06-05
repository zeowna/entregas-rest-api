import { AbstractTypeORMRepository } from '../../common/repository/abstract-typeorm.repository';
import { PartnerProduct } from './entities/partner-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PartnerProductsRepository extends AbstractTypeORMRepository<PartnerProduct> {
  constructor(
    @InjectRepository(PartnerProduct)
    partnerProductRepository: Repository<PartnerProduct>,
  ) {
    super(partnerProductRepository);
  }
}
