import { AbstractEntityDto } from '../../common';
import { Order } from '../entities/order.entity';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OrderPaymentMethods } from '../entities/order-payment-methods.enum';
import { Address } from '../../addresses/entities/address.entity';
import { CreateCartProductDto } from './create-cart-product.dto';
import { OrderStatus } from '../entities/order-statuses.enum';

export class UpdateOrderDto extends AbstractEntityDto<Order> {
  @IsOptional()
  addressId: OrderPaymentMethods;

  @IsOptional()
  @ValidateNested()
  cart: CreateCartProductDto[];

  @IsOptional()
  @IsInt()
  totalValue: number;

  @IsOptional()
  @IsString()
  status: OrderStatus;

  statusUpdatedAt: Date;

  toEntity() {
    return new Order({
      address: new Address({ id: this.addressId }),
      cart: this.cart?.map((createCartProductDto) =>
        createCartProductDto.toEntity(),
      ),
      totalValue: this.totalValue,
      status: this.status,
      statusUpdatedAt: this.statusUpdatedAt,
    });
  }
}
