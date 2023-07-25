import { AbstractEntityPresenter } from '../../common';
import { Order } from '../entities/order.entity';
import { OrderStatuses } from '../entities/order-statuses.enum';
import { PartnerResponse } from '../../partners/responses/partner.reponse';
import { CartProductResponse } from './cart-product.response';
import { AddressResponse } from '../../addresses/responses/address.response';
import { CustomerResponse } from '../../users/responses/customer.response';

export class OrderResponse extends AbstractEntityPresenter<Order> {
  customer: CustomerResponse;

  partner: PartnerResponse;

  cart: CartProductResponse[];

  address: AddressResponse;

  totalValue: number;

  status: OrderStatuses;

  statusUpdatedAt: Date;

  externalServiceId: string;

  constructor(props: Order) {
    super(props);
    this.customer = props?.customer?.present();
    this.partner = props?.partner?.present();
    this.cart = (props?.cart ?? []).map((product) => product.present());
    this.address = props?.address?.present();
    this.totalValue = props?.totalValue;
    this.status = props?.status;
    this.statusUpdatedAt = props?.statusUpdatedAt;
    this.externalServiceId = props?.externalServiceId;
  }
}
