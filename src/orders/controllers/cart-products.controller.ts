import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CustomRequest } from '../../common';
import { CreateCartProductDto } from '../dto/create-cart-product.dto';
import { CreateCartProductService } from '../services/create-cart-product.service';
import { UpdateCartProductService } from '../services/update-cart-product.service';
import { UpdateCartProductDto } from '../dto/update-cart-product.dto';
import { RemoveCartProductService } from '../services/remove-cart-product.service';

@Controller('orders')
export class CartProductsController {
  constructor(
    private readonly createCardProductService: CreateCartProductService,
    private readonly updateCardProductService: UpdateCartProductService,
    private readonly removeCardProductService: RemoveCartProductService,
  ) {}

  @Post('/:orderId/products')
  async create(
    @Req() request: CustomRequest,
    @Param('orderId') orderId: string,
    @Body() createOrderDto: CreateCartProductDto,
  ) {
    createOrderDto.orderId = +orderId;

    return this.createCardProductService.execute(
      createOrderDto,
      request?.correlationId,
    );
  }

  @Patch('/:orderId/products/:id')
  async update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Param('orderId') orderId: string,
    @Body() updateCartProductDto: UpdateCartProductDto,
  ) {
    return this.updateCardProductService.execute(
      id,
      updateCartProductDto,
      request?.correlationId,
    );
  }

  @Delete('/:orderId/products/:id')
  async remove(@Req() request: CustomRequest, @Param('id') id: string) {
    return this.removeCardProductService.execute(+id, request?.correlationId);
  }
}
