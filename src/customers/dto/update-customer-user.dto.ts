import { OmitType } from '@nestjs/mapped-types';
import { CreateCustomerUserDto } from './create-customer-user.dto';

export class UpdateCustomerUserDto extends OmitType(CreateCustomerUserDto, [
  'password',
]) {}
