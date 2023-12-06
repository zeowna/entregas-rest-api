import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { AbstractEntityDto } from '../../common';
import { Product } from '../entities/product.entity';
import { ProductStatus } from '../entities/product-status.enum';
import { ProductCategory } from '../entities/product-category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto extends AbstractEntityDto<Product> {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsDefined()
  @IsString()
  size: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  status: ProductStatus;

  @ApiProperty()
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
