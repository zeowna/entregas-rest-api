import { AbstractEntityPresenter } from '../../common';
import { ProductCategory } from '../entities/product-category.entity';

export class ProductCategoryResponse extends AbstractEntityPresenter<ProductCategory> {
  name: string;

  constructor(props: ProductCategory) {
    super(props);
    this.name = props?.name;
  }
}
