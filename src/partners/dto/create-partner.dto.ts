import { IsDefined, IsOptional, IsString } from 'class-validator';
import { AbstractDto, ID } from '../../common';
import { Partner } from '../entities/partner.entity';
import { Address } from '../../addresses/entities/address.entity';

export class CreatePartnerDto extends AbstractDto<Partner> {
  @IsString()
  name: string;

  @IsString()
  cnpj: string;

  @IsString()
  @IsOptional()
  pictureURI?: string;

  @IsDefined()
  addressId: ID;

  toEntity() {
    return new Partner({
      name: this.name,
      cnpj: this.cnpj,
      pictureURI: this.pictureURI,
      address: new Address({ id: this.addressId }),
    });
  }
}
