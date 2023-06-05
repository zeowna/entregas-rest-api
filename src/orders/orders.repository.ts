import { Injectable } from '@nestjs/common';
import { AbstractTypeORMRepository } from '../common/repository/abstract-typeorm.repository';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository extends AbstractTypeORMRepository<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }
}
