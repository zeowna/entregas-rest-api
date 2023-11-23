import { Injectable } from '@nestjs/common';
import {
  AbstractUpdateEntityService,
  ID,
  NestLoggerService,
} from '../../common';
import { Order } from '../entities/order.entity';
import { OrdersTypeORMRepository } from '../repositories/orders-typeorm.repository';
import { FindOrderByIdService } from './find-order-by-id.service';
import { I18nContext } from 'nestjs-i18n';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { DateTime } from 'luxon';

@Injectable()
export class UpdateOrderService extends AbstractUpdateEntityService<Order> {
  constructor(
    private readonly ordersRepository: OrdersTypeORMRepository,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly logger: NestLoggerService,
  ) {
    super(ordersRepository, findOrderByIdService, logger);
  }

  protected async beforeUpdate(
    id: ID,
    updateEntityDto: UpdateOrderDto,
    correlationId: string,
    i18n?: I18nContext,
  ) {
    if (updateEntityDto.status) {
      updateEntityDto.statusUpdatedAt = DateTime.now().toJSDate();
    }

    return super.beforeUpdate(id, updateEntityDto, correlationId, i18n);
  }
}
