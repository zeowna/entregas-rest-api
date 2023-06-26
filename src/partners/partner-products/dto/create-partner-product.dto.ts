import { Partner } from '../../entities/partner.entity';
import { Product } from '../../../products/entities/product.entity';
import { PartnerProductStatus } from '../entities/partner-product-status.enum';
import { IsDefined, IsInt, IsString } from 'class-validator';

export class CreatePartnerProductDto {
  @IsDefined()
  partner: Partner;

  @IsDefined()
  product: Product;

  @IsDefined()
  @IsInt()
  value: number;

  @IsDefined()
  @IsString()
  status: PartnerProductStatus;
}
