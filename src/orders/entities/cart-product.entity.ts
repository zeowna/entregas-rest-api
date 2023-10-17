import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractTypeORMEntity, ExcludeMethods } from '../../common';
import { Order } from './order.entity';
import { CartProductResponse } from '../responses/cart-product.response';
import { PartnerProduct } from '../../partners/entities/partner-product.entity';
import { CustomerUser } from '../../users/entities/customer-user.entity';

@Entity()
export class CartProduct extends AbstractTypeORMEntity {
  @ManyToOne(() => CustomerUser)
  customer: CustomerUser;

  @ManyToOne(() => PartnerProduct)
  partnerProduct: PartnerProduct;

  @Column('integer')
  quantity: number;

  @Column('integer')
  totalValue: number;

  @ManyToOne(() => Order)
  order: Order;

  constructor(props: ExcludeMethods<CartProduct>) {
    super(props);
    this.customer = props?.customer;
    this.partnerProduct = props?.partnerProduct;
    this.quantity = props?.quantity;
    this.totalValue = props?.totalValue;
    this.order = props?.order;
  }

  present() {
    return new CartProductResponse(this);
  }
}
