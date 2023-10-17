import { Injectable } from '@nestjs/common';
import { AbstractFindEntityByIdService, NestLoggerService } from '../../common';
import { PartnerProduct } from '../entities/partner-product.entity';
import { PartnerProductsTypeORMRepository } from '../repositores/partner-products-typeorm.repository';

@Injectable()
export class FindPartnerProductByIdService extends AbstractFindEntityByIdService<PartnerProduct> {
  constructor(
    private readonly partnerProductsRepository: PartnerProductsTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(partnerProductsRepository, logger);
  }
}
