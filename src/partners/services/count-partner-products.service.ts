import { Injectable } from '@nestjs/common';
import { AbstractCountEntitiesService, NestLoggerService } from '../../common';
import { PartnerProduct } from '../entities/partner-product.entity';
import { PartnerProductsTypeORMRepository } from '../repositores/partner-products-typeorm.repository';

@Injectable()
export class CountPartnerProductsService extends AbstractCountEntitiesService<PartnerProduct> {
  constructor(
    private readonly partnerProductRepository: PartnerProductsTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(partnerProductRepository, logger);
  }
}
