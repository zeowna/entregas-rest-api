import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductCategory } from './product-category.entity';
import { AbstractTypeORMEntity, ExcludeMethods } from '../../common';
import { ProductCategorySizeResponse } from '../responses/product-category-size.response';

@Entity()
export class ProductCategorySize extends AbstractTypeORMEntity {
  @Column()
  name: string;

  @ManyToOne(() => ProductCategory)
  category: ProductCategory;

  constructor(props: ExcludeMethods<ProductCategorySize>) {
    super(props);
    this.name = props?.name;
    this.category = props?.category;
  }

  present() {
    return new ProductCategorySizeResponse(this);
  }
}
