import { Injectable } from '@nestjs/common';
import { AbstractService, NestLoggerService } from '../../common';
import { Product } from '../entities/product.entity';
import { ProductsTypeORMRepository } from '../repositories/products-typeorm.repository';

@Injectable()
export class FindProductByNameService extends AbstractService<Product> {
  constructor(
    private readonly productRepository: ProductsTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(name: string, correlationId: string) {
    this.logBefore({
      name,
      correlationId,
    });

    const found = await this.productRepository.findByName(name);

    this.logAfter({
      name,
      correlationId,
    });

    return found;
  }
}
