import { AbstractEntityDto } from '../../common';
import { CartProduct } from '../entities/cart-product.entity';
import { IsDefined, Max, Min } from 'class-validator';

export class UpdateCartProductDto extends AbstractEntityDto<CartProduct> {
  @IsDefined()
  @Min(0)
  @Max(9999)
  quantity: number;

  toEntity(): CartProduct {
    return new CartProduct({
      quantity: this.quantity,
    });
  }
}
