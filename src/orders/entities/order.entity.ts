import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractTypeORMEntity } from '../../common';
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

  present() {
    return new OrderResponse(this);
  }
}
