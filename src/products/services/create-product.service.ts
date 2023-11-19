import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductsTypeORMRepository } from '../repositories/products-typeorm.repository';

@Injectable()
export class CreateProductService extends AbstractCreateEntityService<Product> {
  constructor(
    protected readonly productRepository: ProductsTypeORMRepository,
    protected readonly logger: NestLoggerService,
  ) {
    super(productRepository, logger);
  }
}
