import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractTypeORMEntity } from '../../../common/entity/abstract-typeorm.entity';
import { Partner } from '../../entities/partner.entity';
import { Product } from '../../../products/entities/product.entity';
import { PartnerProductStatus } from './partner-product-status.enum';

@Entity()
export class PartnerProduct extends AbstractTypeORMEntity {
  @ManyToOne(() => Partner)
  partner: Partner;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ type: 'integer' })
  value: number;

  @Column()
  status: PartnerProductStatus;
}
