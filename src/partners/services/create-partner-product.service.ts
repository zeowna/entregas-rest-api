import { Injectable } from '@nestjs/common';
import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { PartnerProduct } from '../entities/partner-product.entity';
import { PartnerProductsTypeORMRepository } from '../repositores/partner-products-typeorm.repository';

@Injectable()
export class CreatePartnerProductService extends AbstractCreateEntityService<PartnerProduct> {
  constructor(
    private readonly partnerProductsRepository: PartnerProductsTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(partnerProductsRepository, logger);
  }
}
