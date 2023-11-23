import { Body, Controller, Param, Post, Request } from '@nestjs/common';
import { CreateOrderService } from '../../orders/services/create-order.service';
import { CustomRequest } from '../../common';
import { CreateOrderDto } from '../../orders/dto/create-order.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateOrderAddress } from '../../orders/services/create-order-address';
import { CreateOrderAddressDto } from '../../orders/dto/create-order-address.dto';
import { CreateCartProductsService } from '../../orders/services/create-cart-products.service';
import { CreateCartProductsDto } from '../../orders/dto/create-cart-products.dto';

@Controller('customers')
export class CustomersOrdersController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly createOrderAddress: CreateOrderAddress,
    private readonly createCartProductsService: CreateCartProductsService,
  ) {}

  @Post(':customerId([0-9]+)/orders')
  async create(
    @Request() request: CustomRequest,
    @Param('customerId') customerId: string,
    @Body() createOrderDto: CreateOrderDto,
    @I18n() i18n: I18nContext,
  ) {
    createOrderDto.customerId = +customerId;

    return this.createOrderService.execute(
      createOrderDto,
      request.correlationId,
      i18n,
    );
  }

  @Post(':customerId([0-9]+)/orders/:orderId([0-9]+)/addresses')
  async createAddress(
    @Request() request: CustomRequest,
    @Param('orderId') orderId: string,
    @Body() createOrderAddressDto: CreateOrderAddressDto,
    @I18n() i18n: I18nContext,
  ) {
    createOrderAddressDto.orderId = +orderId;

    return this.createOrderAddress.execute(
      createOrderAddressDto,
      request.correlationId,
      i18n,
    );
  }

  @Post(':customerId([0-9]+)/orders/:id([0-9]+)/cart-products')
  async createCartProducts(
    @Request() request: CustomRequest,
    @Body() createCartProductsDto: CreateCartProductsDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.createCartProductsService.execute(
      createCartProductsDto,
      request.correlationId,
      i18n,
    );
  }
}
