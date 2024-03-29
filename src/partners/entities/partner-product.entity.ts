import { Column, Entity, ManyToOne } from 'typeorm';
import { Partner } from './partner.entity';
import { Product } from '../../products/entities/product.entity';
import { PartnerProductStatus } from './partner-product-status.enum';
import { AbstractTypeORMEntity, ExcludeMethods } from '../../common';
import { PartnerProductResponse } from '../repositores/partner-product.response';

@Entity()
export class PartnerProduct extends AbstractTypeORMEntity {
  @Column({ default: '' })
  name: string;

  @ManyToOne(() => Partner, { eager: true })
  partner: Partner;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ type: 'integer' })
  value: number;

  @Column({ default: 0 })
  inStockQuantity: number;

  @Column()
  status: PartnerProductStatus;

  constructor(props: ExcludeMethods<PartnerProduct>) {
    super(props);
    this.name = props?.name;
    this.partner = props?.partner;
    this.product = props?.product;
    this.value = props?.value;
    this.inStockQuantity = props?.inStockQuantity;
    this.status = props?.status;
  }

  present() {
    return new PartnerProductResponse(this);
  }
}
