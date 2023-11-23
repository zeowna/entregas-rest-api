import { Injectable } from '@nestjs/common';
import { AbstractUpdateEntityService, NestLoggerService } from '../../common';
import { Order } from '../entities/order.entity';
import { OrdersTypeORMRepository } from '../repositories/orders-typeorm.repository';
import { FindOrderByIdService } from './find-order-by-id.service';

@Injectable()
export class UpdateOrderService extends AbstractUpdateEntityService<Order> {
  constructor(
    private readonly ordersRepository: OrdersTypeORMRepository,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly logger: NestLoggerService,
  ) {
    super(ordersRepository, findOrderByIdService, logger);
  }
}
