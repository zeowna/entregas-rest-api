import { AddressResponse } from '../../addresses/responses/address.response';
import { UserResponse } from './user.response';
import { CustomerUser } from '../entities/customer-user.entity';

export class CustomerResponse extends UserResponse {
  addresses: AddressResponse[];

  constructor(props: CustomerUser) {
    super(props);
    this.addresses = (props?.addresses ?? []).map((address) =>
      address.present(),
    );
  }
}
