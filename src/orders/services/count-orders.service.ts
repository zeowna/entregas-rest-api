import { Injectable } from '@nestjs/common';
import { AbstractCountEntitiesService, NestLoggerService } from '../../common';
import { Order } from '../entities/order.entity';
import { OrdersTypeORMRepository } from '../repositories/orders-typeorm.repository';

@Injectable()
export class CountOrdersService extends AbstractCountEntitiesService<Order> {
  constructor(
    private readonly ordersRepository: OrdersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(ordersRepository, logger);
  }
}
