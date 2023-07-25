import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Address } from '../../addresses/entities/address.entity';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { i18nValidationMessage } from 'nestjs-i18n';
import { UserTypes } from '../entities/user-types.enum';
import { CreateUserDto } from './create-user.dto';
import { CustomerUser } from '../entities/customer-user.entity';

export class CreateCustomerDto extends CreateUserDto {
  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses?: Address[];

  toEntity() {
    return new CustomerUser({
      ...super.toEntity(),
      addresses: this.addresses,
      type: UserTypes.Customer,
    });
  }
}
