import { ConflictException, Injectable } from '@nestjs/common';
import {
  AbstractUpdateEntityService,
  ID,
  NestLoggerService,
} from '../../common';
import { Product } from '../entities/product.entity';
import { ProductsTypeORMRepository } from '../repositories/products-typeorm.repository';
import { FindProductByIdService } from './find-product-id.service';
import { FindProductByNameService } from './find-product-by-name.service';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class UpdateProductService extends AbstractUpdateEntityService<Product> {
  constructor(
    private readonly productsRepository: ProductsTypeORMRepository,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findProductByNameService: FindProductByNameService,
    private readonly logger: NestLoggerService,
  ) {
    super(productsRepository, findProductByIdService, logger);
  }

  protected async beforeUpdate(
    id: ID,
    updateEntityDto: UpdateProductDto,
    correlationId: string,
  ) {
    const existing = await this.findProductByNameService.execute(
      updateEntityDto.name,
      correlationId,
    );

    if (existing && existing.id !== id) {
      throw new ConflictException(
        `${this.productsRepository.entityName} already exist with name: ${updateEntityDto.name}`,
      );
    }

    return super.beforeUpdate(id, updateEntityDto, correlationId);
  }
}