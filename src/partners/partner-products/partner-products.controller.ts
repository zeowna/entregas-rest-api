import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PartnerProductsService } from './partner-products.service';
import { CreatePartnerProductDto } from './dto/create-partner-product.dto';
import { UpdatePartnerProductDto } from './dto/update-partner-product.dto';

@Controller('partners')
export class PartnerProductsController {
  constructor(
    private readonly partnerProductsService: PartnerProductsService,
  ) {}

  @Post('products')
  create(@Body() createPartnerProductDto: CreatePartnerProductDto) {
    return this.partnerProductsService.create(createPartnerProductDto);
  }

  @Get(':partnerId/products')
  findAll(@Param('partnerId') partnerId: string) {
    return this.partnerProductsService.findAllByPartnerId(+partnerId);
  }

  @Get('products/:id')
  findOne(@Param('id') id: string) {
    return this.partnerProductsService.findById(+id);
  }

  @Patch('products/:id')
  update(
    @Param('id') id: string,
    @Body() updatePartnerProductDto: UpdatePartnerProductDto,
  ) {
    return this.partnerProductsService.update(+id, updatePartnerProductDto);
  }

  @Delete('products/:id')
  remove(@Param('id') id: string) {
    return this.partnerProductsService.remove(+id);
  }
}
