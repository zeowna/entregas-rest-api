import { IsDateString, IsDefined, IsEmail, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsCPF } from 'brazilian-class-validator';
import { AbstractEntityDto } from '../../common';
import { User } from '../entities/user.entity';

export abstract class CreateUserDto extends AbstractEntityDto<User> {
  @IsDefined({
    message: i18nValidationMessage('validation.User.name.required'),
  })
  @IsString({
    message: i18nValidationMessage('validation.User.name.isString'),
  })
  name: string;

  @IsDefined({
    message: i18nValidationMessage('validation.User.birthday.required'),
  })
  @IsDateString(
    {},
    { message: i18nValidationMessage('validation.User.birthday.isDate') },
  )
  birthday: Date;

  @IsDefined({
    message: i18nValidationMessage('validation.User.cpf.required'),
  })
  @IsCPF({
    message: i18nValidationMessage('validation.User.cpf.invalid'),
  })
  cpf: string;

  @IsDefined({
    message: i18nValidationMessage('validation.required'),
  })
  @IsEmail(
    {},
    { message: i18nValidationMessage('validation.User.email.isEmail') },
  )
  email: string;

  @IsDefined({
    message: i18nValidationMessage('validation.User.password.required'),
  })
  @IsString({
    message: i18nValidationMessage('validation.User.password.isString'),
  })
  password: string;
}
