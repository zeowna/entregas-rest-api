import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategory } from '../entities/product-category.entity';
import { AbstractEntityDto } from 'src/common';

export class UpdateProductCategorySizeDto extends AbstractEntityDto<ProductCategorySize> {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  categoryId: number;

  toEntity() {
    return new ProductCategorySize({
      name: this.name,
      category: new ProductCategory({ id: this.categoryId }),
    });
  }
}
