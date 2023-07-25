import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractTypeORMEntity } from '../../common';
import { User } from '../../users/entities/user.entity';
import { Order } from './order.entity';
import { CartProductResponse } from '../responses/cart-product.response';
import { PartnerProduct } from '../../partners/entities/partner-product.entity';

@Entity()
export class CartProduct extends AbstractTypeORMEntity {
  @ManyToOne(() => User)
  customer: User;

  @ManyToOne(() => PartnerProduct)
  partnerProduct: PartnerProduct;

  @Column('integer')
  quantity: number;

  @Column('integer')
  totalValue: number;

  @ManyToOne(() => Order)
  order: Order;

  present() {
    return new CartProductResponse(this);
  }
}
