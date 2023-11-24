import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CustomRequest } from '../../common';
import { AuthGuard } from '../../common/auth';
import { FindOrdersService } from '../../orders/services/find-orders.service';
import { OrderPagingDto } from '../dto/order-paging.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { FindOrderByIdService } from '../../orders/services/find-order-by-id.service';
import { UpdateOrderStatusDto } from '../../orders/dto/update-order-status.dto';
import { UpdateOrderStatusService } from '../../orders/services/update-order-status.service';

@Controller('partners')
export class PartnerOrdersController {
  constructor(
    private readonly findOrdersService: FindOrdersService,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly updateOrderStatusService: UpdateOrderStatusService,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':partnerId([0-9]+)/orders')
  find(
    @Req() request: CustomRequest,
    @Query() queryParams: Record<string, string>,
    @Param('partnerId') partnerId: string,
  ) {
    const orderPagingDto = new OrderPagingDto(queryParams);

    orderPagingDto.conditions = {
      ...orderPagingDto.conditions,
      partner: { eq: +partnerId },
    };

    return this.findOrdersService.execute(
      orderPagingDto,
      request?.correlationId,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':partnerId([0-9]+)/orders/:id([0-9]+)')
  async findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findOrderByIdService.execute(+id, request?.correlationId);
  }

  @UseGuards(AuthGuard)
  @Patch(':partnerId([0-9]+)/orders/:id([0-9]+)/status')
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
