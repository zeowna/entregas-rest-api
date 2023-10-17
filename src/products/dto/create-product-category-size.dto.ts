import { IsDefined, IsString } from 'class-validator';
import { AbstractEntityDto } from '../../common';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategory } from '../entities/product-category.entity';

export class CreateProductCategorySizeDto extends AbstractEntityDto<ProductCategorySize> {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  categoryId: number;

  toEntity() {
    return new ProductCategorySize({
      name: this.name,
      category: new ProductCategory({ id: this.categoryId }),
    });
  }
}
