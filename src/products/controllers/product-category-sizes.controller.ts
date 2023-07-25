import { Controller } from '@nestjs/common';

@Controller('products/category')
export class ProductCategorySizesController {
  // constructor(
  //   private readonly productCategorySizesService: ProductCategorySizesService,
  // ) {}
  //
  // @Post('sizes')
  // create(
  //   @Req() request: CustomRequest,
  //   @Body() createProductCategorySizeDto: CreateProductCategorySizeDto,
  // ) {
  //   return this.productCategorySizesService.create(
  //     createProductCategorySizeDto,
  //     request?.correlationId,
  //   );
  // }
  //
  // @Get('sizes')
  // find(
  //   @Req() request: CustomRequest,
  //   @Query('conditions') conditions: string,
  //   @Query('skip') skip: string,
  //   @Query('limit') limit: string,
  //   @Query('sort') sort: string,
  // ) {
  //   return this.productCategorySizesService.find(
  //     JSON.parse(conditions ?? null),
  //     skip ? +skip : undefined,
  //     limit ? +limit : undefined,
  //     sort ? JSON.parse(sort) : undefined,
  //     request?.correlationId,
  //   );
  // }
  //
  // @Get('sizes/:id')
  // findOne(@Req() request: CustomRequest, @Param('id') id: string) {
  //   return this.productCategorySizesService.findById(
  //     +id,
  //     request?.correlationId,
  //   );
  // }
  //
  // @Patch('sizes/:id')
  // update(
  //   @Req() request: CustomRequest,
  //   @Param('id') id: string,
  //   @Body() updateProductCategorySizeDto: UpdateProductCategorySizeDto,
  // ) {
  //   return this.productCategorySizesService.update(
  //     +id,
  //     updateProductCategorySizeDto,
  //     request?.correlationId,
  //   );
  // }
  //
  // @Delete('sizes/:id')
  // remove(@Req() request: CustomRequest, @Param('id') id: string) {
  //   return this.productCategorySizesService.remove(+id, request?.correlationId);
  // }
}
