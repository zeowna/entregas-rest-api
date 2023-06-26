import { ProductCategory } from '../product-categories/entities/product-category.entity';
import { PartnerProductStatus } from '../../partners/partner-products/entities/partner-product-status.enum';
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
  status: PartnerProductStatus;

  @IsOptional()
  @IsString()
  pictureURI?: string;
}
