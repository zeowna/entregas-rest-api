import { ProductCategory } from '../entities/product-category.entity';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import { AbstractDto } from '../../common';
import { Product } from '../entities/product.entity';
import { ProductStatus } from '../entities/product-status.enum';

export class CreateProductDto extends AbstractDto<Product> {
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
  status: ProductStatus;

  @IsOptional()
  @IsString()
  pictureURI?: string;

  toEntity() {
    return new Product({
      name: this.name,
      category: this.category,
      size: this.size,
      status: this.status,
      pictureURI: this.pictureURI,
    });
  }
}
