import { AbstractEntityPresenter } from '../../common';
import { Product } from '../entities/product.entity';
import { ProductStatus } from '../entities/product-status.enum';
import { ProductCategoryResponse } from './product-category.response';

export class ProductResponse extends AbstractEntityPresenter<Product> {
  name: string;

  category: ProductCategoryResponse;

  size: string;

  status: ProductStatus;

  pictureURI: string;

  constructor(props: Product) {
    super(props);
    this.name = props?.name;
    this.category = props?.category?.present();
    this.size = props?.size;
    this.status = props?.status;
    this.pictureURI = props?.pictureURI;
  }
}
