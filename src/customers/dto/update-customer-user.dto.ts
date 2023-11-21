import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { Address } from '../../addresses/entities/address.entity';
import { CustomerUser } from '../../users/entities/customer-user.entity';

export class UpdateCustomerUserDto extends UpdateUserDto {
  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses?: Address[];

  toEntity() {
    return new CustomerUser({
      name: this.name,
      birthday: this.birthday,
      cpf: this.cpf,
      email: this.email,
      addresses: this.addresses,
    });
  }
}
