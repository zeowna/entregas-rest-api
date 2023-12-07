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
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserTypes } from '../../users/entities/user-types.enum';
import { RolesGuard } from '../../auth/guards/routes.guard';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindProductCategorySizeResponse } from '../responses/find-product-category-size.response';
import { ProductCategorySizeResponse } from '../responses/product-category-size.response';
import { I18n, I18nContext } from 'nestjs-i18n';

@ApiTags('Products', 'Products Categories')
@Controller('products/categories')
export class ProductCategorySizesController {
  constructor(
    private readonly createProductCategorySizeService: CreateProductCategorySizeService,
    private readonly findProductCategorySizesService: FindProductCategorySizesService,
    private readonly updateProductCategorySizesService: UpdateProductCategorySizeService,
  ) {}

  @ApiBearerAuth()
  @ApiQuery({ type: () => ProductCategorySizePagingDto })
  @ApiResponse({ type: () => FindProductCategorySizeResponse })
  @Roles([UserTypes.Admin, UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
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

  @ApiBearerAuth()
  @ApiResponse({ type: () => ProductCategorySizeResponse })
  @Roles([UserTypes.Admin])
  @UseGuards(AuthGuard, RolesGuard)
  @Post(':productCategoryId([0-9]+)/sizes')
  create(
    @Req() request: CustomRequest,
    @Param('productCategoryId') productCategoryId: string,
    @Body() createProductCategorySizeDto: CreateProductCategorySizeDto,
    @I18n() i18n: I18nContext,
  ) {
    createProductCategorySizeDto.categoryId = +productCategoryId;

    return this.createProductCategorySizeService.execute(
      createProductCategorySizeDto,
      request?.correlationId,
      i18n,
    );
  }

  @ApiBearerAuth()
  @ApiResponse({ type: () => ProductCategorySizeResponse })
  @Roles([UserTypes.Admin])
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':productCategoryId([0-9]+)/sizes/:id')
  update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateProductCategorySizeDto: UpdateProductCategorySizeDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.updateProductCategorySizesService.execute(
      +id,
      updateProductCategorySizeDto,
      request?.correlationId,
      i18n,
    );
  }
}
