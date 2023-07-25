import { Controller, Get, Param, Req } from '@nestjs/common';
import { FindPartnerProductsService } from '../services/find-partner-products.service';
import { CustomRequest } from '../../common';
import { PartnerProductsPagingDto } from '../dto/partner-products-pading.dto';

@Controller('partners')
export class PartnerProductsController {
  constructor(
    private readonly findPartnerProductsService: FindPartnerProductsService,
  ) {}

  //
  // @Post('products')
  // create(@Body() createPartnerProductDto: CreatePartnerProductDto) {
  //   return this.partnerProductsService.create(createPartnerProductDto);
  // }
  //
  @Get(':partnerId/products')
  findAll(
    @Req() request: CustomRequest,
    @Param('partnerId') partnerId: string,
  ) {
    return this.findPartnerProductsService.execute(
      new PartnerProductsPagingDto({
        conditions: `{ "partnerId": ${partnerId} }`,
        sort: '{ "value": -1 }',
      }),
      request?.correlationId,
    );
  }

  //
  // @Get('products/:id')
  // findOne(@Param('id') id: string) {
  //   return this.partnerProductsService.findById(+id);
  // }
  //
  // @Patch('products/:id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePartnerProductDto: UpdatePartnerProductDto,
  // ) {
  //   return this.partnerProductsService.update(+id, updatePartnerProductDto);
  // }
  //
  // @Delete('products/:id')
  // remove(@Param('id') id: string) {
  //   return this.partnerProductsService.remove(+id);
  // }
}
