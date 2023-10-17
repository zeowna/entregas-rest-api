import { PartnerProductStatus } from '../entities/partner-product-status.enum';
import { IsDefined, IsInt, IsString, Max, Min } from 'class-validator';
import { AbstractEntityDto, ID } from '../../common';
import { PartnerProduct } from '../entities/partner-product.entity';
import { Partner } from '../entities/partner.entity';
import { Product } from '../../products/entities/product.entity';

export class CreatePartnerProductDto extends AbstractEntityDto<PartnerProduct> {
  @IsDefined()
  partnerId: ID;

  @IsDefined()
  productId: ID;

  @IsDefined()
  @IsInt()
  value: number;

  @IsDefined()
  @IsString()
  status: PartnerProductStatus;

  @IsDefined()
  @Min(0)
  @Max(9999)
  inStockQuantity: number;

  toEntity() {
    return new PartnerProduct({
      partner: new Partner({ id: this.partnerId }),
      product: new Product({ id: this.productId }),
      value: this.value,
      status: this.status,
      inStockQuantity: this.inStockQuantity,
    });
  }
}
