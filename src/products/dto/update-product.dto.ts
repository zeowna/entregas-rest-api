import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '../entities/product-status.enum';
import { ProductCategory } from '../entities/product-category.entity';
import { Product } from '../entities/product.entity';
import { AbstractEntityDto } from 'src/common';

export class UpdateProductDto extends AbstractEntityDto<Product> {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  size: string;

  @ApiProperty()
  @IsOptional()
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
