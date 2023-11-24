import { AbstractEntityDto } from '../../common';
import { Order } from '../entities/order.entity';
import { IsDefined, IsString } from 'class-validator';
import { OrderStatus } from '../entities/order-status.enum';

export class UpdateOrderStatusDto extends AbstractEntityDto<Order> {
  @IsDefined()
  @IsString()
  status: OrderStatus;

  toEntity() {
    return new Order({
      status: this.status,
    });
  }
}
