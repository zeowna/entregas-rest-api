import { Injectable } from '@nestjs/common';
import { AbstractTypeORMRepository, ID } from '../../common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategorySize } from '../entities/product-category-size.entity';

@Injectable()
export class ProductCategorySizesTypeORMRepository extends AbstractTypeORMRepository<ProductCategorySize> {
  constructor(
    @InjectRepository(ProductCategorySize)
    private readonly productCategorySizeRepository: Repository<ProductCategorySize>,
  ) {
    super(productCategorySizeRepository);
  }

  async findByCategoryId(categoryId: ID) {
    return this.productCategorySizeRepository.findBy({
      category: { id: categoryId },
    });
  }

  async findByCategoryIdAndName(categoryId: ID, name: string) {
    return this.productCategorySizeRepository.findOneBy({
      name,
      category: { id: categoryId },
    });
  }
}
