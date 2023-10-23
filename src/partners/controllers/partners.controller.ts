import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { FindPartnersService } from '../services/find-partners.service';
import { FindPartnersDto } from '../dto/find-partiners.dto';
import { CustomRequest } from '../../common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { FindPartnerByIdService } from '../services/find-partner-by-id.service';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { CreatePartnerService } from '../services/create-partner.service';

@Controller('partners')
export class PartnersController {
  constructor(
    private readonly findPartnersService: FindPartnersService,
    private readonly findPartnerById: FindPartnerByIdService,
    private readonly createPartnerService: CreatePartnerService,
  ) {}

  @Get()
  find(
    @Req() request: CustomRequest,
    @Query() findPartnersDto: FindPartnersDto,
  ) {
    return this.findPartnersService.execute(
      findPartnersDto,
      request?.correlationId,
    );
  }

  @Get(':id([0-9]+)')
  async findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findPartnerById.execute(+id, request?.correlationId, i18n);
  }

  @Post()
  async create(
    @Req() request: CustomRequest,
    @Body() updateProductCategoryDto: CreatePartnerDto,
  ) {
    return this.createPartnerService.execute(
      updateProductCategoryDto,
      request?.correlationId,
    );
  }
}
