import { Injectable } from '@nestjs/common';
import { ProductCategory } from '../entities/product-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractTypeORMRepository } from '../../common';

@Injectable()
export class ProductCategoriesTypeORMRepository extends AbstractTypeORMRepository<ProductCategory> {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategorySizeRepository: Repository<ProductCategory>,
  ) {
    super(productCategorySizeRepository);
  }

  async findByName(name: string) {
    return this.productCategorySizeRepository.findOneBy({ name });
  }
}
