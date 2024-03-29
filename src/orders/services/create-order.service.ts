import { Injectable } from '@nestjs/common';
import { AbstractCreateEntityService, NestLoggerService } from '../../common';
import { Order } from '../entities/order.entity';
import { OrdersTypeORMRepository } from '../repositories/orders-typeorm.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { FindUserByIdService } from '../../users/services/find-user-by-id.service';
import { CustomerUser } from '../../users/entities/customer-user.entity';
import { FindPartnerByIdService } from '../../partners/services/find-partner-by-id.service';

@Injectable()
export class CreateOrderService extends AbstractCreateEntityService<Order> {
  constructor(
    private readonly ordersRepository: OrdersTypeORMRepository,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly findPartnerByIdService: FindPartnerByIdService,
    private readonly logger: NestLoggerService,
  ) {
    super(ordersRepository, logger);
  }

  protected async beforeCreate(
    createOrderDto: CreateOrderDto,
    correlationId: string,
  ) {
    const [customer, partner] = await Promise.all([
      this.findUserByIdService.execute(
        createOrderDto.customerId,
        correlationId,
      ) as Promise<CustomerUser>,
      this.findPartnerByIdService.execute(
        createOrderDto.partnerId,
        correlationId,
      ),
    ]);

    return new Order({
      ...createOrderDto.toEntity(),
      customer,
      partner,
    });
  }
}
