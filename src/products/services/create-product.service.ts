import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { ConflictException, Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductsTypeORMRepository } from '../repositories/products-typeorm.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { FindProductByNameService } from './find-product-by-name.service';

@Injectable()
export class CreateProductService extends AbstractCreateEntityService<Product> {
  constructor(
    protected readonly productRepository: ProductsTypeORMRepository,
    private readonly findProductByNameService: FindProductByNameService,
    protected readonly logger: NestLoggerService,
  ) {
    super(productRepository, logger);
  }

  protected async beforeCreate(
    createEntityDto: CreateProductDto,
    correlationId: string,
  ) {
    const existing = await this.findProductByNameService.execute(
      createEntityDto.name,
      correlationId,
    );

    if (existing) {
      throw new ConflictException(
        `${this.productRepository.entityName} already exist with name: ${createEntityDto.name}`,
      );
    }

    return super.beforeCreate(createEntityDto, correlationId);
  }
}
