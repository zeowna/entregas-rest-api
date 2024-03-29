import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractTypeORMEntity, ExcludeMethods } from '../../common';
import { User } from '../../users/entities/user.entity';
import { OrderStatus } from './order-status.enum';
import { Partner } from '../../partners/entities/partner.entity';
import { Address } from '../../addresses/entities/address.entity';
import { CartProduct } from './cart-product.entity';
import { OrderResponse } from '../responses/order.response';
import { CustomerUser } from '../../users/entities/customer-user.entity';
import { OrderPaymentMethods } from './order-payment-methods.enum';

@Entity()
export class Order extends AbstractTypeORMEntity {
  @ManyToOne(() => User, { eager: true })
  customer: CustomerUser;

  @ManyToOne(() => Partner, { eager: true })
  partner: Partner;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.order, {
    eager: true,
  })
  cart: CartProduct[];

  @ManyToOne(() => Address, { eager: true })
  address: Address;

  @Column('integer', { nullable: true })
  totalValue?: number;

  @Column({ default: OrderStatus.Created })
  status: OrderStatus;

  @Column('timestamptz', { nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  statusUpdatedAt: Date;

  @Column()
  paymentMethod: OrderPaymentMethods;

  @Column('integer', { nullable: true })
  changeValue?: number;

  @Column({ nullable: true })
  externalServiceId?: string;

  constructor(props: ExcludeMethods<Order>) {
    super(props);
    this.customer = props?.customer;
    this.partner = props?.partner;
    this.cart = props?.cart;
    this.address = props?.address;
    this.totalValue = props?.totalValue;
    this.status = props?.status;
    this.statusUpdatedAt = props?.statusUpdatedAt;
    this.paymentMethod = props?.paymentMethod;
    this.changeValue = props?.changeValue;
    this.externalServiceId = props?.externalServiceId;
  }

  present() {
    return new OrderResponse(this);
  }
}
