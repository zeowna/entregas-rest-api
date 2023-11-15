import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Address } from '../../addresses/entities/address.entity';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { i18nValidationMessage } from 'nestjs-i18n';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { CustomerUser } from '../../users/entities/customer-user.entity';
import { UserTypes } from '../../users/entities/user-types.enum';

export class CreateCustomerUserDto extends CreateUserDto {
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
      password: this.password,
      addresses: this.addresses,
      type: UserTypes.Customer,
    });
  }
}
