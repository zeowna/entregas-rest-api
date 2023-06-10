import { Injectable } from '@nestjs/common';
import { AbstractService } from '../common/service/abstract-service.service';
import { Order } from './entities/order.entity';
import { OrdersTypeORMRepository } from './orders-typeorm-repository.service';

@Injectable()
export class OrdersService extends AbstractService<Order> {
  constructor(private readonly ordersRepository: OrdersTypeORMRepository) {
    super(ordersRepository);
  }
}
