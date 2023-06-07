import {
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

export class CreateUserDto {
  @IsDefined({
    message: i18nValidationMessage('validation.required'),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  name: string;

  @IsDefined({
    message: i18nValidationMessage('validation.required'),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  birthday: Date;

  @IsDefined({
    message: i18nValidationMessage('validation.required'),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString'),
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
    { message: i18nValidationMessage('validation.user.email.valid') },
  )
  @Validate(IsUserEmailAlreadyInUse, {
    message: i18nValidationMessage('validation.user.email.exists'),
  })
  email: string;

  @IsDefined({
    message: i18nValidationMessage('validation.required'),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  password: string;

  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.isString'),
  })
  profilePictureURI?: string;

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
