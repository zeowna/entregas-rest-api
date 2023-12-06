import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CustomRequest, ID } from '../../common';
import { CreateProductDto } from '../dto/create-product.dto';
import { CreateProductService } from '../services/create-product.service';
import { ProductPagingDto } from '../dto/product-paging.dto';
import { FindProductsService } from '../services/find-products.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { FindProductByIdService } from '../services/find-product-id.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UpdateProductService } from '../services/update-product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadProductPictureService } from '../services/upload-product-picture.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserTypes } from '../../users/entities/user-types.enum';
import { AuthGuard } from '../../common/auth';
import { RolesGuard } from '../../auth/guards/routes.guard';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindProductResponse } from '../responses/find-product.response';
import { ProductResponse } from '../responses/product.response';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly findProductsService: FindProductsService,
    private readonly findProductById: FindProductByIdService,
    private readonly createProductService: CreateProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly uploadProductPictureService: UploadProductPictureService,
  ) {}

  @ApiBearerAuth()
  @ApiQuery({ type: () => ProductPagingDto })
  @ApiResponse({ type: () => FindProductResponse })
  @Roles([UserTypes.Admin, UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async find(
    @Req() request: CustomRequest,
    @Query() queryParams: Record<string, string>,
  ) {
    return this.findProductsService.execute(
      new ProductPagingDto(queryParams),
      request.correlationId,
    );
  }

  @ApiBearerAuth()
  @ApiResponse({ type: () => ProductResponse })
  @Roles([UserTypes.Admin, UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id([0-9]+)')
  async findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findProductById.execute(+id, request?.correlationId, i18n);
  }

  @ApiBearerAuth()
  @ApiResponse({ type: () => ProductResponse })
  @Roles([UserTypes.Admin])
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(
    @Req() request: CustomRequest,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return this.createProductService.execute(
      updateProductDto,
      request?.correlationId,
    );
  }

  @ApiBearerAuth()
  @ApiResponse({ type: () => ProductResponse })
  @Roles([UserTypes.Admin])
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id([0-9]+)')
  async update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateProductDto,
  ) {
    return this.updateProductService.execute(
      +id,
      updateUserDto,
      request?.correlationId,
    );
  }

  @ApiBearerAuth()
  @ApiResponse({ type: String })
  @Roles([UserTypes.Admin])
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id([0-9]+)/pictures')
  async uploadFile(
    @Req() request: CustomRequest,
    @Param('id') id: ID,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return this.uploadProductPictureService.execute(
      +id,
      file,
      request.correlationId,
    );
  }
}
