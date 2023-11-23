import { Injectable } from '@nestjs/common';
import { AbstractTypeORMRepository } from '../../common';
import { Order } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersTypeORMRepository extends AbstractTypeORMRepository<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {
    super(ordersRepository);
  }
}
