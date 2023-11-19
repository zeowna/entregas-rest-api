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
    return this.productCategorySizeRepository.find({
      where: { category: { id: categoryId } },
      order: { name: 1 },
    });
  }

  async findByCategoryIdAndName(categoryId: ID, name: string) {
    return this.productCategorySizeRepository.findOneBy({
      name,
      category: { id: categoryId },
    });
  }
}
