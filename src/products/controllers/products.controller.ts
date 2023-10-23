import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
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

@Controller('products')
export class ProductsController {
  constructor(
    private readonly findProductsService: FindProductsService,
    private readonly findProductById: FindProductByIdService,
    private readonly createProductService: CreateProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly uploadProductPictureService: UploadProductPictureService,
  ) {}

  @Get()
  async find(@Req() request: CustomRequest) {
    return this.findProductsService.execute(
      new ProductPagingDto(request.query),
      request.correlationId,
    );
  }

  @Get(':id([0-9]+)')
  async findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findProductById.execute(+id, request?.correlationId);
  }

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

  @Post(':id([0-9]+)/pictures')
  @UseInterceptors(FileInterceptor('file'))
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
