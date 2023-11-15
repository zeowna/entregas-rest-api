import { Injectable } from '@nestjs/common';
import { AbstractService, NestLoggerService } from '../../common';
import { PartnerProductsTypeORMRepository } from '../repositores/partner-products-typeorm.repository';
import { Product } from '../../products/entities/product.entity';
import { ProductStatus } from '../../products/entities/product-status.enum';
import { PartnerProductStatus } from '../entities/partner-product-status.enum';

@Injectable()
export class UpdateAllPartnerProductsStatusByProductService extends AbstractService<boolean> {
  constructor(
    private readonly partnerProductsRepository: PartnerProductsTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  private getStatusFromProduct(product: Product) {
    switch (product.status) {
      case ProductStatus.Active:
        return PartnerProductStatus.Active;
      case ProductStatus.Inactive:
        return PartnerProductStatus.Inactive;
      default:
        throw new Error(
          `Product ${product.id} with status unkown: ${product.status}`,
        );
    }
  }

  async execute(product: Product, correlationId: string) {
    this.logBefore({
      product,
      correlationId,
    });

    try {
      await this.partnerProductsRepository.updateStatusByProductId(
        product.id,
        this.getStatusFromProduct(product),
      );

      this.logAfter({
        product,
        correlationId,
        success: true,
      });
      return true;
    } catch (err) {
      this.logAfter({
        err,
        product,
        correlationId,
        success: false,
      });

      return false;
    }
  }
}
