import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductCategorySizesService } from './product-category-sizes.service';
import { CreateProductCategorySizeDto } from './dto/create-product-category-size.dto';
import { UpdateProductCategorySizeDto } from './dto/update-product-category-size.dto';

@Controller('products/category')
export class ProductCategorySizesController {
  constructor(
    private readonly productCategorySizesService: ProductCategorySizesService,
  ) {}

  @Post('sizes')
  create(@Body() createProductCategorySizeDto: CreateProductCategorySizeDto) {
    return this.productCategorySizesService.create(
      createProductCategorySizeDto,
    );
  }

  @Get('sizes')
  findAll() {
    return this.productCategorySizesService.findAll();
  }

  @Get('sizes/:id')
  findOne(@Param('id') id: string) {
    return this.productCategorySizesService.findById(+id);
  }

  @Patch('sizes/:id')
  update(
    @Param('id') id: string,
    @Body() updateProductCategorySizeDto: UpdateProductCategorySizeDto,
  ) {
    return this.productCategorySizesService.update(
      +id,
      updateProductCategorySizeDto,
    );
  }

  @Delete('sizes/:id')
  remove(@Param('id') id: string) {
    return this.productCategorySizesService.remove(+id);
  }
}
