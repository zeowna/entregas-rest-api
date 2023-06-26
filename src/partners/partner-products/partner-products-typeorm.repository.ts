import { AbstractTypeORMRepository } from '../../common/repository/abstract-typeorm.repository';
import { PartnerProduct } from './entities/partner-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PartnerProductsTypeORMRepository extends AbstractTypeORMRepository<PartnerProduct> {
  constructor(
    @InjectRepository(PartnerProduct)
    private partnerProductRepository: Repository<PartnerProduct>,
  ) {
    super(partnerProductRepository);
  }
}
