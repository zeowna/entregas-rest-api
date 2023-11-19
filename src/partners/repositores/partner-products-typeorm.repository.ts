import { AbstractTypeORMRepository, ID } from '../../common';
import { PartnerProduct } from '../entities/partner-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PartnerProductStatus } from '../entities/partner-product-status.enum';

@Injectable()
export class PartnerProductsTypeORMRepository extends AbstractTypeORMRepository<PartnerProduct> {
  constructor(
    @InjectRepository(PartnerProduct)
    private readonly partnerProductRepository: Repository<PartnerProduct>,
  ) {
    super(partnerProductRepository);
  }

  async updateStatusByProductId(
    productId: ID,
    name: string,
    status: PartnerProductStatus,
  ) {
    await this.partnerProductRepository.update(
      {
        product: { id: productId },
      },
      { name, status },
    );
  }
}
