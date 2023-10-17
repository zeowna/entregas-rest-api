import { Column, Entity, ManyToOne } from 'typeorm';
import { Partner } from './partner.entity';
import { Product } from '../../products/entities/product.entity';
import { PartnerProductStatus } from './partner-product-status.enum';
import { AbstractTypeORMEntity, ExcludeMethods } from '../../common';
import { PartnerProductResponse } from '../repositores/partner-product.response';

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

  @Column({ default: 0 })
  inStockQuantity: number;

  constructor(props: ExcludeMethods<PartnerProduct>) {
    super(props);
    this.partner = props?.partner;
    this.product = props?.product;
    this.value = props?.value;
    this.status = props?.status;
    this.inStockQuantity = props?.inStockQuantity;
  }

  present() {
    return new PartnerProductResponse(this);
  }
}
