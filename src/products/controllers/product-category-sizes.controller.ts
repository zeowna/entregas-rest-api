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
import { CustomRequest } from '../../common';
import { FindProductCategorySizesService } from '../services/find-product-category-sizes.service';
import { CreateProductCategorySizeDto } from '../dto/create-product-category-size.dto';
import { CreateProductCategorySizeService } from '../services/create-product-category-sizes.service';
import { UpdateProductCategorySizeDto } from '../dto/update-product-category-size.dto';
import { UpdateProductCategorySizeService } from '../services/update-product-category-size.service';
import { AuthGuard } from '../../common/auth';
import { ProductCategorySizePagingDto } from '../dto/product-category-size-paging.dto';

@Controller('products/categories')
export class ProductCategorySizesController {
  constructor(
    private readonly createProductCategorySizeService: CreateProductCategorySizeService,
    private readonly findProductCategorySizesService: FindProductCategorySizesService,
    private readonly updateProductCategorySizesService: UpdateProductCategorySizeService,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':productCategoryId([0-9]+)/sizes')
  find(
    @Req() request: CustomRequest,
    @Param('productCategoryId') productCategoryId: string,
    @Query() queryParams: Record<string, string>,
  ) {
    const productCategorySizePagingDto = new ProductCategorySizePagingDto(
      queryParams,
    );
    productCategorySizePagingDto.conditions = {
      ...productCategorySizePagingDto.conditions,
      category: { eq: +productCategoryId },
    };

    return this.findProductCategorySizesService.execute(
      productCategorySizePagingDto,
      request?.correlationId,
    );
  }

  @UseGuards(AuthGuard)
  @Post(':productCategoryId([0-9]+)/sizes')
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

  @UseGuards(AuthGuard)
  @Patch(':productCategoryId([0-9]+)/sizes/:id')
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
