import { IsDefined, IsInt, IsOptional } from 'class-validator';
import { AbstractEntityDto, ID } from '../../common';
import { Order } from '../entities/order.entity';
import { CustomerUser } from '../../users/entities/customer-user.entity';
import { Partner } from '../../partners/entities/partner.entity';
import { OrderPaymentMethods } from '../entities/order-payment-methods.enum';

export class CreateOrderDto extends AbstractEntityDto<Order> {
  customerId: ID;

  @IsDefined()
  partnerId: ID;

  @IsDefined()
  paymentMethod: OrderPaymentMethods;

  @IsOptional()
  @IsInt()
  changeValue?: number;

  toEntity() {
    return new Order({
      customer: new CustomerUser({ id: this.customerId }),
      partner: new Partner({ id: this.partnerId }),
      paymentMethod: this.paymentMethod,
      changeValue: this.changeValue,
    });
  }
}
