import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractTypeORMEntity } from '../../common/entity/abstract-typeorm.entity';
import { User } from '../../users/entities/user.entity';
import { OrderStatuses } from './order-statuses.enum';
import { Partner } from '../../partners/entities/partner.entity';
import { Address } from '../../addresses/entities/address.entity';
import { CartProduct } from '../cart-products/entities/cart-product.entity';

@Entity()
export class Order extends AbstractTypeORMEntity {
  @ManyToOne(() => User)
  customer: User;

  @ManyToOne(() => Partner)
  partner: Partner;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.order)
  cart: CartProduct[];

  address: Address;

  @Column('integer')
  value: number;

  @Column({ default: OrderStatuses.Created })
  status: OrderStatuses;

  @Column({ nullable: true })
  statusUpdatedAt: Date;

  @Column({ nullable: true })
  externalServiceId: string;
}
