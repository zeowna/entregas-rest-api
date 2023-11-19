import { Injectable } from '@nestjs/common';
import {
  AbstractUpdateEntityService,
  ID,
  NestLoggerService,
} from '../../common';
import { Product } from '../entities/product.entity';
import { ProductsTypeORMRepository } from '../repositories/products-typeorm.repository';
import { FindProductByIdService } from './find-product-id.service';
import { UpdateAllPartnerProductsStatusByProductService } from '../../partners/services/update-all-partner-products-status-by-product.service';

@Injectable()
export class UpdateProductService extends AbstractUpdateEntityService<Product> {
  constructor(
    private readonly productsRepository: ProductsTypeORMRepository,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly updateAllPartnerProductsStatusByProductService: UpdateAllPartnerProductsStatusByProductService,
    private readonly logger: NestLoggerService,
  ) {
    super(productsRepository, findProductByIdService, logger);
  }

  protected async afterUpdate(
    id: ID,
    entity: Product,
    correlationId: string,
  ): Promise<void> {
    await this.updateAllPartnerProductsStatusByProductService.execute(
      entity,
      correlationId,
    );

    return super.afterUpdate(id, entity, correlationId);
  }
}
