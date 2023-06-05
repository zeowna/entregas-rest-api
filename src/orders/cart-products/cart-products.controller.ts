import { Body, Controller, Post } from '@nestjs/common';
import { CartProductsService } from './cart-products.service';
import { CreateCartProductDto } from './dto/create-cart-product.dto';

@Controller('orders')
export class CartProductsController {
  constructor(private readonly orderService: CartProductsService) {}

  @Post('products')
  create(@Body() createOrderDto: CreateCartProductDto) {
    return this.orderService.create(createOrderDto);
  }
}
