import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntityPresenter } from '../../common';
import { ProductCategorySize } from '../entities/product-category-size.entity';
import { ProductCategoryResponse } from './product-category.response';

export class ProductCategorySizeResponse extends AbstractEntityPresenter<ProductCategorySize> {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => ProductCategoryResponse })
  category: ProductCategoryResponse;

  constructor(props: ProductCategorySize) {
    super(props);
    this.name = props?.name;
    this.category = props?.category?.present();
  }
}
