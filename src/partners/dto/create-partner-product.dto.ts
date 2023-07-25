import { PartnerProductStatus } from '../entities/partner-product-status.enum';
import { IsDefined, IsInt, IsString } from 'class-validator';
import { AbstractDto, ID } from '../../common';
import { PartnerProduct } from '../entities/partner-product.entity';
import { Partner } from '../entities/partner.entity';
import { Product } from '../../products/entities/product.entity';

export class CreatePartnerProductDto extends AbstractDto<PartnerProduct> {
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

  toEntity() {
    return new PartnerProduct({
      partner: new Partner({ id: this.partnerId }),
      product: new Product({ id: this.productId }),
      value: this.value,
      status: this.status,
    });
  }
}
