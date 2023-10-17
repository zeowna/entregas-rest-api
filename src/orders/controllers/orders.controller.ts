import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { CustomRequest } from '../../common';
import { CreateOrderService } from '../services/create-order.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly createOrderService: CreateOrderService) {}

  // @Get()
  // find(@Req() request: CustomRequest, @Query('skip') skip = '0', @Query('limit') limit = '10') {
  //   return this.findOrdersService.execute(findOrdersDto.toCondition(), request?.correlationId);
  // }

  // @Get(':id')
  // findById(@Param('id') id: string, @I18n() i18n: I18nContext) {
  //   return this.orderService.findById(+id);
  // }

  @Post()
  create(
    @Req() request: CustomRequest,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.createOrderService.execute(
      createOrderDto,
      request.correlationId,
    );
  }
}
