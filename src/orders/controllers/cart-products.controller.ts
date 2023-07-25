import { Controller } from '@nestjs/common';

@Controller('orders')
export class CartProductsController {
  // constructor(private readonly orderService: CartProductsService) {}
  //
  // @Post('products')
  // create(
  //   @Req() request: CustomRequest,
  //   @Body() createOrderDto: CreateCartProductDto,
  // ) {
  //   return this.orderService.create(createOrderDto, request?.correlationId);
  // }
}
