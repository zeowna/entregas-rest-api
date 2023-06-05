import { Injectable } from '@nestjs/common';
import { AbstractService } from '../common/service/abstract-service.service';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService extends AbstractService<Product> {
  constructor(private readonly productsRepository: ProductsRepository) {
    super(productsRepository);
  }
}
