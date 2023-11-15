import { User } from '../entities/user.entity';
import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsCPF } from 'brazilian-class-validator';
import { AbstractEntityDto } from '../../common';

export class UpdateUserDto extends AbstractEntityDto<User> {
  @IsOptional()
  @IsDefined({
    message: i18nValidationMessage('validation.User.name.required'),
  })
  @IsString({
    message: i18nValidationMessage('validation.User.name.isString'),
  })
  name: string;

  @IsOptional()
  @IsDefined({
    message: i18nValidationMessage('validation.User.birthday.required'),
  })
  @IsDateString(
    {},
    { message: i18nValidationMessage('validation.User.birthday.isDate') },
  )
  birthday: Date;

  @IsOptional()
  @IsDefined({
    message: i18nValidationMessage('validation.User.cpf.required'),
  })
  @IsCPF({
    message: i18nValidationMessage('validation.User.cpf.invalid'),
  })
  cpf: string;

  @IsOptional()
  @IsDefined({
    message: i18nValidationMessage('validation.User.email.required'),
  })
  @IsEmail(
    {},
    { message: i18nValidationMessage('validation.User.email.isEmail') },
  )
  email: string;

  toEntity() {
    return new User({
      name: this.name,
      birthday: this.birthday,
      cpf: this.cpf,
      email: this.email,
    });
  }
}
