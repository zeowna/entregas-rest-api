import { AbstractEntityPresenter } from '../../common';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategoryResponse } from './product-category.response';

export class ProductCategorySizeResponse extends AbstractEntityPresenter<ProductCategorySize> {
  name: string;

  category: ProductCategoryResponse;

  constructor(props: ProductCategorySize) {
    super(props);
    this.name = props?.name;
    this.category = props?.category?.present();
  }
}
