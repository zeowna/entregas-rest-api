import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { UserTypes } from '../entities/user-types.enum';
import { Address } from '../../addresses/entities/address.entity';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsUserCpfAlreadyInUse } from './is-user-cpf-already-in-use.validation';
import { IsUserEmailAlreadyInUse } from './is-user-email-already-in-use.validation';
import { IsCPF } from 'brazilian-class-validator';

export class CreateUserDto {
  @IsDefined({
    message: i18nValidationMessage('validation.user.name.required'),
  })
  @IsString({
    message: i18nValidationMessage('validation.user.name.isString'),
  })
  name: string;

  @IsDefined({
    message: i18nValidationMessage('validation.user.birthday.required'),
  })
  @IsDateString(
    {},
    { message: i18nValidationMessage('validation.user.birthday.isDate') },
  )
  birthday: Date;

  @IsDefined({
    message: i18nValidationMessage('validation.user.cpf.required'),
  })
  @IsCPF({
    message: i18nValidationMessage('validation.user.cpf.invalid'),
  })
  @Validate(IsUserCpfAlreadyInUse, {
    message: i18nValidationMessage('validation.user.cpf.exists'),
  })
  cpf: string;

  @IsDefined({
    message: i18nValidationMessage('validation.required'),
  })
  @IsEmail(
    {},
    { message: i18nValidationMessage('validation.user.email.isEmail') },
  )
  @Validate(IsUserEmailAlreadyInUse, {
    message: i18nValidationMessage('validation.user.email.exists'),
  })
  email: string;

  @IsDefined({
    message: i18nValidationMessage('validation.user.password.required'),
  })
  @IsString({
    message: i18nValidationMessage('validation.user.password.isString'),
  })
  password: string;

  @IsDefined({
    message: i18nValidationMessage('validation.required'),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  type: UserTypes;

  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses?: Address[];
}
