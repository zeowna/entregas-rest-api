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
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateProductCategoryService } from '../services/create-product-category.service';
import { FindProductCategoriesService } from '../services/find-product-categories.service';
import { FindProductCategoryByIdService } from '../services/find-product-category-by-id.service';
import { UpdateProductCategoryService } from '../services/update-product-category.service';
import { UpdateProductCategoryDto } from '../dto/update-product-category.dto';
import { ProductCategoryPagingDto } from '../dto/product-category-paging.dto';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserTypes } from '../../users/entities/user-types.enum';
import { AuthGuard } from '../../common/auth';
import { RolesGuard } from '../../auth/guards/routes.guard';

@Controller('products/categories')
export class ProductCategoriesController {
  constructor(
    private readonly findProductCategoriesService: FindProductCategoriesService,
    private readonly findProductCategoryById: FindProductCategoryByIdService,
    private readonly createProductCategoryService: CreateProductCategoryService,
    private readonly updateProductCategoryService: UpdateProductCategoryService,
  ) {}

  @Roles([UserTypes.Admin, UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async find(
    @Req() request: CustomRequest,
    @Query() queryParams: Record<string, string>,
  ) {
    return this.findProductCategoriesService.execute(
      new ProductCategoryPagingDto(queryParams),
      request.correlationId,
    );
  }

  @Roles([UserTypes.Admin, UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id([0-9]+)')
  async findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findProductCategoryById.execute(
      +id,
      request?.correlationId,
      i18n,
    );
  }

  @Roles([UserTypes.Admin])
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(
    @Req() request: CustomRequest,
    @Body() updateProductCategoryDto: CreateProductCategoryDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.createProductCategoryService.execute(
      updateProductCategoryDto,
      request?.correlationId,
      i18n,
    );
  }

  @Roles([UserTypes.Admin, UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id([0-9]+)')
  async update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateProductCategoryDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.updateProductCategoryService.execute(
      +id,
      updateUserDto,
      request?.correlationId,
      i18n,
    );
  }
}
