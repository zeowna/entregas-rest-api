import { Controller } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  // constructor(private readonly orderService: OrdersService) {}
  //
  // @Post()
  // create(@Body() createOrderDto: CreateOrderDto) {
  //   return this.orderService.create(createOrderDto);
  // }
  //
  // @Get()
  // findAll(@Query('skip') skip = '0', @Query('limit') limit = '10') {
  //   return this.orderService.findAll(+skip, +limit);
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string, @I18n() i18n: I18nContext) {
  //   return this.orderService.findById(+id);
  // }
}
