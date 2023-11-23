import { AbstractEntityPresenter } from '../../common';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../entities/order-statuses.enum';
import { PartnerResponse } from '../../partners/responses/partner.reponse';
import { CartProductResponse } from './cart-product.response';
import { AddressResponse } from '../../addresses/responses/address.response';
import { CustomerResponse } from '../../users/responses/customer.response';
import { OrderPaymentMethods } from '../entities/order-payment-methods.enum';

export class OrderResponse extends AbstractEntityPresenter<Order> {
  customer: CustomerResponse;

  partner: PartnerResponse;

  cart: CartProductResponse[];

  address: AddressResponse;

  totalValue: number;

  status: OrderStatus;

  statusUpdatedAt: Date;

  paymentMethod: OrderPaymentMethods;

  changeValue: number;

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
    this.paymentMethod = props?.paymentMethod;
    this.changeValue = props?.changeValue;
    this.externalServiceId = props?.externalServiceId;
  }
}
