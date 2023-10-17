import { AbstractEntityDto } from '../../common';
import { IsDefined, IsString } from 'class-validator';
import { CustomerUser } from '../entities/customer-user.entity';

export class UpdateCustomerPasswordDto extends AbstractEntityDto<CustomerUser> {
  @IsString()
  @IsDefined()
  password: string;

  toEntity() {
    return new CustomerUser({ password: this.password });
  }
}
