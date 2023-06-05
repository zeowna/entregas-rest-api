import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractTypeORMEntity } from '../../../common/entity/abstract-typeorm.entity';
import { Partner } from '../../entities/partner.entity';
import { Product } from '../../../products/entities/product.entity';
import { PartnerProductStatusesEnum } from './partner-product-statuses.enum';

@Entity()
export class PartnerProduct extends AbstractTypeORMEntity {
  @ManyToOne(() => Partner)
  partner: Partner;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ type: 'integer' })
  value: number;

  @Column()
  status: PartnerProductStatusesEnum;
}
