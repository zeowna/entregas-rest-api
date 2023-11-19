import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FindPartnerProductsService } from '../services/find-partner-products.service';
import { CustomRequest } from '../../common';
import { PartnerProductsPagingDto } from '../dto/partner-products-pading.dto';
import { FindPartnerProductByIdService } from '../services/find-partner-product-by-id.service';
import { CreatePartnerProductService } from '../services/create-partner-product.service';
import { CreatePartnerProductDto } from '../dto/create-partner-product.dto';
import { UpdatePartnerProductDto } from '../dto/update-partner-product.dto';
import { UpdatePartnerProductService } from '../services/update-partner-product.service';
import { AuthGuard } from '../../common/auth';

@Controller('partners')
export class PartnerProductsController {
  constructor(
    private readonly findPartnerProductsService: FindPartnerProductsService,
    private readonly findPartnerProductByIdService: FindPartnerProductByIdService,
    private readonly createPartnerProductService: CreatePartnerProductService,
    private readonly updatePartnerProductService: UpdatePartnerProductService,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':partnerId([0-9]+)/products')
  find(
    @Req() request: CustomRequest,
    @Query() queryParams: Record<string, string>,
    @Param('partnerId') partnerId: string,
  ) {
    const partnerProductsPagingDto = new PartnerProductsPagingDto(queryParams);

    partnerProductsPagingDto.conditions = {
      ...partnerProductsPagingDto.conditions,
      partner: { eq: +partnerId },
    };

    return this.findPartnerProductsService.execute(
      partnerProductsPagingDto,
      request?.correlationId,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':partnerId([0-9]+)/products/:id([0-9]+)')
  findById(@Req() request: CustomRequest, @Param('id') id: string) {
    return this.findPartnerProductByIdService.execute(
      +id,
      request.correlationId,
    );
  }

  @UseGuards(AuthGuard)
  @Post(':partnerId([0-9]+)/products')
  findOne(
    @Req() request: CustomRequest,
    @Param('partnerId') partnerId: string,
    @Body() createPartnerProductDto: CreatePartnerProductDto,
  ) {
    createPartnerProductDto.partnerId = +partnerId;

    return this.createPartnerProductService.execute(
      createPartnerProductDto,
      request.correlationId,
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':partnerId([0-9]+)/products/:id([0-9]+)')
  update(
    @Req() request: CustomRequest,
    @Param('partnerId') partnerId: string,
    @Param('id') id: string,
    @Body() updatePartnerProductDto: UpdatePartnerProductDto,
  ) {
    updatePartnerProductDto.partnerId = +partnerId;

    return this.updatePartnerProductService.execute(
      +id,
      updatePartnerProductDto,
      request.correlationId,
    );
  }
}
