import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CustomRequest } from '../../common';
import { FindProductCategorySizesService } from '../services/find-product-category-sizes.service';
import { CreateProductCategorySizeDto } from '../dto/create-product-category-size.dto';
import { CreateProductCategorySizeService } from '../services/create-product-category-sizes.service';
import { UpdateProductCategorySizeDto } from '../dto/update-product-category-size.dto';
import { UpdateProductCategorySizeService } from '../services/update-product-category-size.service';

@Controller('products/categories')
export class ProductCategorySizesController {
  constructor(
    private readonly createProductCategorySizeService: CreateProductCategorySizeService,
    private readonly findProductCategorySizesService: FindProductCategorySizesService,
    private readonly updateProductCategorySizesService: UpdateProductCategorySizeService,
  ) {}

  @Post(':productCategoryId/sizes')
  create(
    @Req() request: CustomRequest,
    @Param('productCategoryId') productCategoryId: string,
    @Body() createProductCategorySizeDto: CreateProductCategorySizeDto,
  ) {
    createProductCategorySizeDto.categoryId = +productCategoryId;

    return this.createProductCategorySizeService.execute(
      createProductCategorySizeDto,
      request?.correlationId,
    );
  }

  @Get(':productCategoryId/sizes')
  find(
    @Req() request: CustomRequest,
    @Param('productCategoryId') productCategoryId: string,
  ) {
    return this.findProductCategorySizesService.execute(
      +productCategoryId,
      request?.correlationId,
    );
  }

  @Patch(':productCategoryId/sizes/:id')
  update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateProductCategorySizeDto: UpdateProductCategorySizeDto,
  ) {
    return this.updateProductCategorySizesService.execute(
      +id,
      updateProductCategorySizeDto,
      request?.correlationId,
    );
  }

  //
  // @Delete('sizes/:id')
  // remove(@Req() request: CustomRequest, @Param('id') id: string) {
  //   return this.productCategorySizesService.remove(+id, request?.correlationId);
  // }
}
