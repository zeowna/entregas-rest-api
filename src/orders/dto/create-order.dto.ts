import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCartProductDto } from '../cart-products/dto/create-cart-product.dto';

export class CreateOrderDto {
  @IsDefined()
  customer: number;

  @IsDefined()
  partner: number;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CreateCartProductDto)
  cart: CreateCartProductDto[];

  @IsDefined()
  address: number;

  @IsDefined()
  totalValue: number;
}
