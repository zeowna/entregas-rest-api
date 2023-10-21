import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CustomRequest } from '../../common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateProductCategoryService } from '../services/create-product-category.service';
import { FindProductCategoriesService } from '../services/find-product-categories.service';
import { FindProductCategoryByIdService } from '../services/find-product-category-by-id.service';
import { UpdateProductCategoryService } from '../services/update-product-category.service';
import { UpdateProductCategoryDto } from '../dto/update-product-category.dto';
import { ProductCategoryPagingDto } from '../dto/product-category-paging.dto';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';

@Controller('products/categories')
export class ProductCategoriesController {
  constructor(
    private readonly findProductCategoriesService: FindProductCategoriesService,
    private readonly findProductCategoryById: FindProductCategoryByIdService,
    private readonly createProductCategoryService: CreateProductCategoryService,
    private readonly updateProductCategoryService: UpdateProductCategoryService,
  ) {}

  @Get()
  private find(@Req() request: CustomRequest) {
    return this.findProductCategoriesService.execute(
      new ProductCategoryPagingDto(request.query),
      request.correlationId,
    );
  }

  @Get(':id')
  private findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findProductCategoryById.execute(+id, request?.correlationId);
  }

  @Post()
  private create(
    @Req() request: CustomRequest,
    @Body() updateProductCategoryDto: CreateProductCategoryDto,
  ) {
    return this.createProductCategoryService.execute(
      updateProductCategoryDto,
      request?.correlationId,
    );
  }

  @Patch(':id')
  private update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateProductCategoryDto,
  ) {
    return this.updateProductCategoryService.execute(
      +id,
      updateUserDto,
      request?.correlationId,
    );
  }
}
