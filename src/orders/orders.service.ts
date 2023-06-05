import { Injectable } from '@nestjs/common';
import { AbstractService } from '../common/service/abstract-service.service';
import { Order } from './entities/order.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService extends AbstractService<Order> {
  constructor(private readonly ordersRepository: OrdersRepository) {
    super(ordersRepository);
  }
}
