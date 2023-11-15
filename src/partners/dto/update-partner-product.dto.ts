import { AbstractEntityDto, ID } from '../../common';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PartnerProductStatus } from '../entities/partner-product-status.enum';
import { PartnerProduct } from '../entities/partner-product.entity';
import { Partner } from '../entities/partner.entity';

export class UpdatePartnerProductDto extends AbstractEntityDto<PartnerProduct> {
  partnerId: ID;

  @IsOptional()
  @IsInt()
  value: number;

  @IsOptional()
  @IsString()
  status: PartnerProductStatus;

  @IsOptional()
  @Min(0)
  @Max(9999)
  inStockQuantity: number;

  toEntity() {
    return new PartnerProduct({
      partner: new Partner({ id: this.partnerId }),
      value: this.value,
      status: this.status,
      inStockQuantity: this.inStockQuantity,
    });
  }
}
