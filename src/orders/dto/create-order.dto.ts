import { IsDefined } from 'class-validator';
import { AbstractEntityDto, ID } from '../../common';
import { Order } from '../entities/order.entity';
import { CustomerUser } from '../../users/entities/customer-user.entity';
import { Partner } from '../../partners/entities/partner.entity';
import { Address } from '../../addresses/entities/address.entity';

export class CreateOrderDto extends AbstractEntityDto<Order> {
  @IsDefined()
  customerId: ID;

  @IsDefined()
  partnerId: ID;

  @IsDefined()
  addressId: ID;

  toEntity(): Order {
    return new Order({
      customer: new CustomerUser({ id: this.customerId }),
      partner: new Partner({ id: this.partnerId }),
      address: new Address({ id: this.addressId }),
    });
  }
}
