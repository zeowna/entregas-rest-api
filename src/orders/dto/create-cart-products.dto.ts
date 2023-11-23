import { CreateCartProductDto } from './create-cart-product.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ID } from '../../common';

export class CreateCartProductsDto {
  orderId: ID;

  customerId: ID;

  @ValidateNested()
  @Type(() => CreateCartProductDto)
  cart: CreateCartProductDto[];
}
