import { Injectable } from '@nestjs/common';
import { AbstractFindEntityByIdService, NestLoggerService } from '../../common';
import { Product } from '../entities/product.entity';
import { ProductsTypeORMRepository } from '../repositories/products-typeorm.repository';

@Injectable()
export class FindProductByIdService extends AbstractFindEntityByIdService<Product> {
  constructor(
    private readonly productsRepository: ProductsTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(productsRepository, logger);
  }
}
