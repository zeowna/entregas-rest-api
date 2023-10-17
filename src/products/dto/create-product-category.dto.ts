import { IsDefined, IsString } from 'class-validator';
import { AbstractEntityDto } from '../../common';
import { ProductCategory } from '../entities/product-category.entity';

export class CreateProductCategoryDto extends AbstractEntityDto<ProductCategory> {
  @IsDefined()
  @IsString()
  name: string;

  toEntity() {
    return new ProductCategory({ name: this.name });
  }
}
