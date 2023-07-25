import { IsDateString, IsDefined, IsEmail, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsCPF } from 'brazilian-class-validator';
import { AbstractDto } from '../../common';
import { User } from '../entities/user.entity';
import { CustomerUser } from '../entities/customer-user.entity';

export class CreateUserDto extends AbstractDto<User> {
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

  toEntity() {
    return new CustomerUser({
      name: this.name,
      birthday: this.birthday,
      cpf: this.cpf,
      email: this.email,
      password: this.password,
    });
  }
}
