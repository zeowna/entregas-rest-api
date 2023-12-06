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
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserTypes } from '../../users/entities/user-types.enum';
import { RolesGuard } from '../../auth/guards/routes.guard';

@Controller('partners')
export class PartnerProductsController {
  constructor(
    private readonly findPartnerProductsService: FindPartnerProductsService,
    private readonly findPartnerProductByIdService: FindPartnerProductByIdService,
    private readonly createPartnerProductService: CreatePartnerProductService,
    private readonly updatePartnerProductService: UpdatePartnerProductService,
  ) {}

  @Roles([UserTypes.Partner, UserTypes.Customer])
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':partnerId([0-9]+)/products')
  find(
    @Req() request: CustomRequest,
    @Query() queryParams: Record<string, string>,
    @Param('partnerId') partnerId: string,
  ) {
    const partnerProductsPagingDto = new PartnerProductsPagingDto(queryParams);

    partnerProductsPagingDto.conditions = {
      ...partnerProductsPagingDto.conditions,
      partner: { eq: request.user.partnerId || +partnerId },
    };

    return this.findPartnerProductsService.execute(
      partnerProductsPagingDto,
      request?.correlationId,
    );
  }

  @Roles([UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':partnerId([0-9]+)/products/:id([0-9]+)')
  findById(@Req() request: CustomRequest, @Param('id') id: string) {
    return this.findPartnerProductByIdService.execute(
      +id,
      request.correlationId,
    );
  }

  @Roles([UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @Post(':partnerId([0-9]+)/products')
  findOne(
    @Req() request: CustomRequest,
    @Param('partnerId') partnerId: string,
    @Body() createPartnerProductDto: CreatePartnerProductDto,
  ) {
    createPartnerProductDto.partnerId = request.user.partnerId || +partnerId;

    return this.createPartnerProductService.execute(
      createPartnerProductDto,
      request.correlationId,
    );
  }

  @Roles([UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':partnerId([0-9]+)/products/:id([0-9]+)')
  update(
    @Req() request: CustomRequest,
    @Param('partnerId') partnerId: string,
    @Param('id') id: string,
    @Body() updatePartnerProductDto: UpdatePartnerProductDto,
  ) {
    updatePartnerProductDto.partnerId = request.user.partnerId || +partnerId;

    return this.updatePartnerProductService.execute(
      +id,
      updatePartnerProductDto,
      request.correlationId,
    );
  }
}
