import { IsOptional, IsString, MaxLength } from 'class-validator';
import { AbstractEntityDto, ID } from '../../common';
import { Partner } from '../entities/partner.entity';
import { IsCNPJ } from 'brazilian-class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { PartnerStatus } from '../entities/partner.status';
import { Address } from '../../addresses/entities/address.entity';

export class UpdatePartnerDto extends AbstractEntityDto<Partner> {
  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.Partner.name.isString'),
  })
  @MaxLength(65)
  name: string;

  @IsOptional()
  @IsCNPJ({
    message: i18nValidationMessage('validation.Partner.cnpj.isCNPJ'),
  })
  cnpj: string;

  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.Partner.pictureURI.isString'),
  })
  pictureURI?: string;

  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.Partner.status.isString'),
  })
  status?: PartnerStatus;

  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.Partner.openingHour.isString'),
  })
  openingHours: string;

  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.Partner.closingHour.isString'),
  })
  closingHours: string;

  @IsOptional()
  isOnline: boolean;

  addressId: ID;

  toEntity() {
    return new Partner({
      name: this.name,
      cnpj: this.cnpj,
      pictureURI: this.pictureURI,
      openingHours: this.openingHours,
      closingHours: this.closingHours,
      address: new Address({ id: this.addressId }),
      isOnline: this.isOnline,
    });
  }
}
