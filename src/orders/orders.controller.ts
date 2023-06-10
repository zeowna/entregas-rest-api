import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll(@Query('skip') skip = '0', @Query('limit') limit = '10') {
    return this.orderService.findAll(+skip, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @I18n() i18n: I18nContext) {
    this.orderService.setI18n(i18n);
    return this.orderService.findById(+id);
  }
}
