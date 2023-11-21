import { ChildEntity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Address } from '../../addresses/entities/address.entity';
import { UserTypes } from './user-types.enum';
import { ExcludeMethods } from '../../common';
import { CustomerResponse } from '../responses/customer.response';

@ChildEntity(UserTypes.Customer)
export class CustomerUser extends User {
  @OneToMany(() => Address, (address) => address.user, { eager: true })
  addresses?: Address[];

  type = UserTypes.Customer;

  constructor(props: ExcludeMethods<CustomerUser>) {
    super(props);
    this.addresses = props?.addresses;
  }

  present() {
    return new CustomerResponse(this);
  }
}
