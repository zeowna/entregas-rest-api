import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsModule } from './products.module';
import { ProductCategoriesController } from './controllers/product-categories.controller';
import { ProductCategorySizesController } from './controllers/product-category-sizes.controller';
import { ProductsTypeORMRepository } from './repositories/products-typeorm.repository';
import { ProductCategoryTypeORMRepository } from './repositories/product-category-typeorm-repository';
import { ProductCategorySizesTypeORMRepository } from './repositories/product-category-sizes-typeorm.repository';
import { CreateProductService } from './services/create-product.service';
import { CreateProductCategoryService } from './services/create-product-category.service';
import { CreateProductCategorySizeService } from './services/create-product-category-size.service';

@Module({
  imports: [ProductsModule],
  controllers: [
    ProductsController,
    ProductCategoriesController,
    ProductCategorySizesController,
  ],
  providers: [
    ProductsTypeORMRepository,
    ProductCategoryTypeORMRepository,
    ProductCategorySizesTypeORMRepository,
    CreateProductService,
    CreateProductCategoryService,
    CreateProductCategorySizeService,
  ],
  exports: [
    CreateProductService,
    CreateProductCategoryService,
    CreateProductCategorySizeService,
  ],
})
export class ProductsHttpModule {}
