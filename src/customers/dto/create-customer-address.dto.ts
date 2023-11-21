import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { ID } from '../../common';
import { Address } from '../../addresses/entities/address.entity';
import { CustomerUser } from '../../users/entities/customer-user.entity';

export class CreateCustomerAddressDto extends CreateAddressDto {
  customerId: ID;

  toEntity() {
    return new Address({
      ...super.toEntity(),
      user: new CustomerUser({ id: this.customerId }),
    });
  }
}
