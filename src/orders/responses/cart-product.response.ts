import { AbstractEntityPresenter } from '../../common';
import { User } from '../../users/entities/user.entity';
import { PartnerProduct } from '../../partners/entities/partner-product.entity';
import { CartProduct } from '../entities/cart-product.entity';
import { OrderResponse } from './order.response';

export class CartProductResponse extends AbstractEntityPresenter<CartProduct> {
  customer: User;

  partnerProduct: PartnerProduct;

  quantity: number;

  totalValue: number;

  order: OrderResponse;

  constructor(props: CartProduct) {
    super(props);
    this.customer = props?.customer;
    this.partnerProduct = props?.partnerProduct;
    this.quantity = props?.quantity;
    this.totalValue = props?.totalValue;
    this.order = props?.order.present();
  }
}
