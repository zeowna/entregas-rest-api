import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderService } from '../../orders/services/create-order.service';
import { CustomRequest } from '../../common';
import { CreateOrderDto } from '../../orders/dto/create-order.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateOrderAddress } from '../../orders/services/create-order-address';
import { CreateOrderAddressDto } from '../../orders/dto/create-order-address.dto';
import { CreateCartProductsService } from '../../orders/services/create-cart-products.service';
import { CreateCartProductsDto } from '../../orders/dto/create-cart-products.dto';
import { AuthGuard } from '../../common/auth';
import { OrderPagingDto } from '../../partners/dto/order-paging.dto';
import { FindOrdersService } from '../../orders/services/find-orders.service';
import { FindOrderByIdService } from '../../orders/services/find-order-by-id.service';
import { UpdateOrderStatusDto } from '../../orders/dto/update-order-status.dto';
import { UpdateOrderStatusService } from '../../orders/services/update-order-status.service';

@Controller('customers')
export class CustomersOrdersController {
  constructor(
    private readonly findOrdersService: FindOrdersService,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly createOrderService: CreateOrderService,
    private readonly createOrderAddress: CreateOrderAddress,
    private readonly createCartProductsService: CreateCartProductsService,
    private readonly updateOrderStatusService: UpdateOrderStatusService,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':customerId([0-9]+)/orders')
  find(
    @Req() request: CustomRequest,
    @Query() queryParams: Record<string, string>,
    @Param('customerId') customerId: string,
  ) {
    const orderPagingDto = new OrderPagingDto(queryParams);

    orderPagingDto.conditions = {
      ...orderPagingDto.conditions,
      customer: { eq: +customerId },
    };

    return this.findOrdersService.execute(
      orderPagingDto,
      request?.correlationId,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':customerId([0-9]+)/orders/:id([0-9]+)')
  findById(@Req() request: CustomRequest, @Param('id') id: string) {
    return this.findOrderByIdService.execute(+id, request?.correlationId);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Post(':customerId([0-9]+)/orders/:id([0-9]+)/cart-products')
  async createCartProducts(
    @Request() request: CustomRequest,
    @Param('customerId') customerId: string,
    @Param('id') id: string,
    @Body() createCartProductsDto: CreateCartProductsDto,
    @I18n() i18n: I18nContext,
  ) {
    createCartProductsDto.customerId = +customerId;
    createCartProductsDto.orderId = +id;

    return this.createCartProductsService.execute(
      createCartProductsDto,
      request.correlationId,
      i18n,
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':customerId([0-9]+)/orders/:id([0-9]+)/status')
  async update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.updateOrderStatusService.execute(
      +id,
      updateOrderStatusDto,
      request?.correlationId,
      i18n,
    );
  }
}
