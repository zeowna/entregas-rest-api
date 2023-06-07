import { Injectable } from '@nestjs/common';
import { AbstractService } from '../../common/service/abstract-service.service';
import { PartnerProduct } from './entities/partner-product.entity';
import { PartnerProductsTypeORMRepository } from './partner-products-typeorm.repository';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';

@Injectable()
export class PartnerProductsService extends AbstractService<PartnerProduct> {
  constructor(
    private readonly partnerProductRepository: PartnerProductsTypeORMRepository,
  ) {
    super(partnerProductRepository);
  }

  async findAllByPartnerId(
    partnerId: number,
    skip = 0,
    limit = 10,
    order: FindOptionsOrder<PartnerProduct> = { createdAt: 'DESC' } as any,
  ) {
    return super.findAll(skip, limit, order);
  }
}
