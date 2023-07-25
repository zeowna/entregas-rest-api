import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractTypeORMEntity, ExcludeMethods } from '../../common';
import { ProductStatus } from './product-status.enum';
import { ProductCategory } from './product-category.entity';
import { ProductResponse } from '../responses/product.response';

@Entity()
export class Product extends AbstractTypeORMEntity {
  @Column()
  name: string;

  @ManyToOne(() => ProductCategory, { eager: true })
  category: ProductCategory;

  @Column()
  size: string;

  @Column({ default: ProductStatus.Active })
  status: ProductStatus;

  @Column({ nullable: true })
  pictureURI?: string;

  constructor(props: ExcludeMethods<Product>) {
    super(props);
    this.name = props?.name;
    this.category = props?.category;
    this.size = props?.size;
    this.status = props?.status;
    this.pictureURI = props?.pictureURI;
  }

  present() {
    return new ProductResponse(this);
  }
}
