import { ProductCategory } from '../../product-categories/entities/product-category.entity';
import { IsDefined, IsString } from 'class-validator';

export class CreateProductCategorySizeDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  category: ProductCategory;
}
