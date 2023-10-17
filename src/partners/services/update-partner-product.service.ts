import { Injectable } from '@nestjs/common';
import { AbstractUpdateEntityService, NestLoggerService } from '../../common';
import { PartnerProduct } from '../entities/partner-product.entity';
import { PartnerProductsTypeORMRepository } from '../repositores/partner-products-typeorm.repository';
import { FindPartnerProductByIdService } from './find-partner-product-by-id.service';

@Injectable()
export class UpdatePartnerProductService extends AbstractUpdateEntityService<PartnerProduct> {
  constructor(
    private readonly partnerProductsRepository: PartnerProductsTypeORMRepository,
    private readonly findPartnerProductByIdService: FindPartnerProductByIdService,
    private readonly logger: NestLoggerService,
  ) {
    super(partnerProductsRepository, findPartnerProductByIdService, logger);
  }
}
