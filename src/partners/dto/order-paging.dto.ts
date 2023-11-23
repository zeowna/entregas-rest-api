import { AbstractPagingDto } from '../../common';
import { Order } from '../../orders/entities/order.entity';

export class OrderPagingDto extends AbstractPagingDto<Order> {}
