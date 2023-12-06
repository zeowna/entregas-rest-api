import { AbstractEntityPresenter } from '../../common';
import { Product } from '../entities/product.entity';
import { ProductStatus } from '../entities/product-status.enum';
import { ProductCategoryResponse } from './product-category.response';
import { ApiProperty } from '@nestjs/swagger';

export class ProductResponse extends AbstractEntityPresenter<Product> {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => ProductCategoryResponse })
  category: ProductCategoryResponse;

  @ApiProperty()
  size: string;

  @ApiProperty({
    type: () => ProductStatus,
    enum: Object.values(ProductStatus),
  })
  status: ProductStatus;

  @ApiProperty()
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
