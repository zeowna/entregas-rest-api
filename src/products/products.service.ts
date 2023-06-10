import { Injectable } from '@nestjs/common';
import { AbstractService } from '../common/service/abstract-service.service';
import { Product } from './entities/product.entity';
import { ProductsTypeORMRepository } from './products-typeorm.repository';

@Injectable()
export class ProductsService extends AbstractService<Product> {
  constructor(private readonly productsRepository: ProductsTypeORMRepository) {
    super(productsRepository);
  }
}
