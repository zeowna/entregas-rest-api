import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractTypeORMEntity, ExcludeMethods } from '../../common';
import { User } from '../../users/entities/user.entity';
import { OrderStatuses } from './order-statuses.enum';
import { Partner } from '../../partners/entities/partner.entity';
import { Address } from '../../addresses/entities/address.entity';
import { CartProduct } from './cart-product.entity';
import { OrderResponse } from '../responses/order.response';
import { CustomerUser } from '../../users/entities/customer-user.entity';

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

  @Column('integer')
  totalValue: number;

  @Column({ default: OrderStatuses.Created })
  status: OrderStatuses;

  @Column({ nullable: true })
  statusUpdatedAt: Date;

  @Column({ nullable: true })
  externalServiceId: string;

  constructor(props: ExcludeMethods<Order>) {
    super(props);
    this.customer = props?.customer;
    this.partner = props?.partner;
    this.cart = props?.cart;
    this.address = props?.address;
    this.totalValue = props?.totalValue;
    this.status = props?.status;
    this.statusUpdatedAt = props?.statusUpdatedAt;
    this.externalServiceId = props?.externalServiceId;
  }

  present() {
    return new OrderResponse(this);
  }
}
