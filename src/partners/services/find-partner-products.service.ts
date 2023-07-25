import { Injectable } from '@nestjs/common';
import { AbstractFindEntitiesService, NestLoggerService } from '../../common';
import { PartnerProduct } from '../entities/partner-product.entity';
import { PartnerProductsTypeORMRepository } from '../repositores/partner-products-typeorm.repository';
import { CountPartnerProductsService } from './count-partner-products.service';
import { FindPartnerProductResponse } from '../responses/find-partner-products.response';

@Injectable()
export class FindPartnerProductsService extends AbstractFindEntitiesService<
  PartnerProduct,
  FindPartnerProductResponse
> {
  constructor(
    private readonly partnerProductRepository: PartnerProductsTypeORMRepository,
    private readonly countPartnerProductsService: CountPartnerProductsService,
    private readonly logger: NestLoggerService,
  ) {
    super(
      partnerProductRepository,
      countPartnerProductsService,
      logger,
      FindPartnerProductResponse,
    );
  }
}
