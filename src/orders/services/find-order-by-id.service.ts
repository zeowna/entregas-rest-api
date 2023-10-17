import { Injectable } from '@nestjs/common';
import { AbstractFindEntityByIdService, NestLoggerService } from '../../common';
import { Order } from '../entities/order.entity';
import { OrdersTypeORMRepository } from '../repositories/orders-typeorm-repository.service';

@Injectable()
export class FindOrderByIdService extends AbstractFindEntityByIdService<Order> {
  constructor(
    private readonly ordersRepository: OrdersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(ordersRepository, logger);
  }
}
