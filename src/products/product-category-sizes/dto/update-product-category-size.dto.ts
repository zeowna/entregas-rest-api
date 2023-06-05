import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCategorySizeDto } from './create-product-category-size.dto';

export class UpdateProductCategorySizeDto extends PartialType(
  CreateProductCategorySizeDto,
) {}
