import { Column, Entity } from 'typeorm';
import { AbstractTypeORMEntity, ExcludeMethods } from '../../common';
import { ProductCategoryResponse } from '../responses/product-category.response';
import { Product } from './product.entity';

@Entity()
export class ProductCategory extends AbstractTypeORMEntity {
  @Column({ unique: true })
  name: string;

  constructor(props: ExcludeMethods<Product>) {
    super(props);
    this.name = props?.name;
  }

  present() {
    return new ProductCategoryResponse(this);
  }
}
