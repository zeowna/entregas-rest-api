import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractTypeORMEntity } from '../../../common/entity/abstract-typeorm.entity';
import { User } from '../../../users/entities/user.entity';
import { Order } from '../../entities/order.entity';
import { PartnerProduct } from '../../../partners/partner-products/entities/partner-product.entity';

@Entity()
export class CartProduct extends AbstractTypeORMEntity {
  @ManyToOne(() => User)
  customer: User;

  @ManyToOne(() => PartnerProduct)
  partnerProduct: PartnerProduct;

  @Column('integer')
  quantity: number;

  @Column('integer')
  value: number;

  @ManyToOne(() => Order)
  order: Order;
}
