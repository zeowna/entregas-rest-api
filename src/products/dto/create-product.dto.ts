import { ProductCategory } from '../product-categories/entities/product-category.entity';
import { ProductStatuses } from '../entities/product-statuses.enum';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  category: ProductCategory;

  @IsDefined()
  @IsString()
  size: string;

  @IsDefined()
  @IsString()
  status: ProductStatuses;

  @IsOptional()
  @IsString()
  pictureURI?: string;
}
