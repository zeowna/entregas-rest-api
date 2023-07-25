import { IsDefined, IsString } from 'class-validator';
import { AbstractDto } from '../../common';
import { ProductCategory } from '../entities/product-category.entity';

export class CreateProductCategoryDto extends AbstractDto<ProductCategory> {
  @IsDefined()
  @IsString()
  name: string;

  toEntity() {
    return new ProductCategory({ name: this.name });
  }
}
