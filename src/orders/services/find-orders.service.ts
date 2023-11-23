import { Injectable } from '@nestjs/common';
import { AbstractFindEntitiesService, NestLoggerService } from '../../common';
import { Order } from '../entities/order.entity';
import { FindOrdersResponse } from '../responses/find-orders.response';
import { OrdersTypeORMRepository } from '../repositories/orders-typeorm.repository';
import { CountOrdersService } from './count-orders.service';

@Injectable()
export class FindOrdersService extends AbstractFindEntitiesService<
  Order,
  FindOrdersResponse
> {
  constructor(
    private readonly ordersRepository: OrdersTypeORMRepository,
    private readonly countOrdersService: CountOrdersService,
    private readonly logger: NestLoggerService,
  ) {
    super(ordersRepository, countOrdersService, logger, FindOrdersResponse);
  }
}
