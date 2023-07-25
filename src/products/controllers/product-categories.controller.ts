import { Controller } from '@nestjs/common';

@Controller('products')
export class ProductCategoriesController {
  // constructor(
  //   private readonly productCategoriesService: ProductCategoriesService,
  // ) {}
  //
  // @Post('categories')
  // create(
  //   @Req() request: CustomRequest,
  //   @Body() createProductCategoryDto: CreateProductCategoryDto,
  // ) {
  //   return this.productCategoriesService.create(
  //     createProductCategoryDto,
  //     request?.correlationId,
  //   );
  // }
  //
  // @Get('categories')
  // findAll(
  //   @Req() request: CustomRequest,
  //   @Query('conditions') conditions: string,
  //   @Query('skip') skip: string,
  //   @Query('limit') limit: string,
  //   @Query('sort') sort: string,
  // ) {
  //   return this.productCategoriesService.find(
  //     JSON.parse(conditions ?? null),
  //     skip ? +skip : undefined,
  //     limit ? +limit : undefined,
  //     sort ? JSON.parse(sort) : undefined,
  //     request?.correlationId,
  //   );
  // }
  //
  // @Get('categories/:id')
  // findOne(@Req() request: CustomRequest, @Param('id') id: string) {
  //   return this.productCategoriesService.findById(+id, request?.correlationId);
  // }
  //
  // @Patch('categories/:id')
  // update(
  //   @Req() request: CustomRequest,
  //   @Param('id') id: string,
  //   @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  // ) {
  //   return this.productCategoriesService.update(
  //     +id,
  //     updateProductCategoryDto,
  //     request?.correlationId,
  //   );
  // }
  //
  // @Delete('categories/:id')
  // remove(@Req() request: CustomRequest, @Param('id') id: string) {
  //   return this.productCategoriesService.remove(+id, request?.correlationId);
  // }
}
