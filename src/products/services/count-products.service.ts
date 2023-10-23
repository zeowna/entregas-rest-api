import { Injectable } from '@nestjs/common';
import { AbstractCountEntitiesService, NestLoggerService } from '../../common';
import { Product } from '../entities/product.entity';
import { ProductsTypeORMRepository } from '../repositories/products-typeorm.repository';

@Injectable()
export class CountProductsService extends AbstractCountEntitiesService<Product> {
  constructor(
    private readonly productRepository: ProductsTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(productRepository, logger);
  }
}
