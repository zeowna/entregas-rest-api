import { IsDateString, IsDefined, IsEmail, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsCPF } from 'brazilian-class-validator';
import { AbstractEntityDto } from '../../common';
import { User } from '../entities/user.entity';

export abstract class CreateUserDto extends AbstractEntityDto<User> {
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
  // @Validate(IsUserCpfAlreadyInUse, {
  //   message: i18nValidationMessage('validation.user.cpf.exists'),
  // })
  cpf: string;

  @IsDefined({
    message: i18nValidationMessage('validation.required'),
  })
  @IsEmail(
    {},
    { message: i18nValidationMessage('validation.user.email.isEmail') },
  )
  // @Validate(IsUserEmailAlreadyInUse, {
  //   message: i18nValidationMessage('validation.user.email.exists'),
  // })
  email: string;

  @IsDefined({
    message: i18nValidationMessage('validation.user.password.required'),
  })
  @IsString({
    message: i18nValidationMessage('validation.user.password.isString'),
  })
  password: string;
}
