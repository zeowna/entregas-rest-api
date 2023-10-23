import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { AbstractEntityDto } from '../../common';
import { Product } from '../entities/product.entity';
import { ProductStatus } from '../entities/product-status.enum';
import { ProductCategory } from '../entities/product-category.entity';

export class CreateProductDto extends AbstractEntityDto<Product> {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  categoryId: number;

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
      category: new ProductCategory({ id: this.categoryId }),
      size: this.size,
      status: this.status,
      pictureURI: this.pictureURI,
    });
  }
}
