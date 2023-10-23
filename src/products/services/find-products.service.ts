import { Injectable } from '@nestjs/common';
import { AbstractFindEntitiesService, NestLoggerService } from '../../common';
import { Product } from '../entities/product.entity';
import { ProductsTypeORMRepository } from '../repositories/products-typeorm.repository';
import { FindProductSizeResponse } from '../responses/find-product-size.response';
import { CountProductsService } from './count-products.service';

@Injectable()
export class FindProductsService extends AbstractFindEntitiesService<
  Product,
  FindProductSizeResponse
> {
  constructor(
    private readonly productsRepository: ProductsTypeORMRepository,
    private readonly countProductsService: CountProductsService,
    private readonly logger: NestLoggerService,
  ) {
    super(
      productsRepository,
      countProductsService,
      logger,
      FindProductSizeResponse,
    );
  }
}
