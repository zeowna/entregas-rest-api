import { Injectable } from '@nestjs/common';
import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { Product } from '../entities/product.entity';
import { ProductsTypeORMRepository } from '../repositories/products-typeorm.repository';

@Injectable()
export class CreateProductService extends AbstractCreateEntityService<Product> {
  constructor(
    private readonly productsRepository: ProductsTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(productsRepository, logger);
  }
}
