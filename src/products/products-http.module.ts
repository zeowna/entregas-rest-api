import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsModule } from './products.module';
import { ProductCategoriesController } from './product-categories/product-categories.controller';
import { ProductCategorySizesController } from './product-category-sizes/product-category-sizes.controller';
import { ProductCategoriesService } from './product-categories/product-categories.service';
import { ProductCategorySizesService } from './product-category-sizes/product-category-sizes.service';
import { ProductsTypeORMRepository } from './products-typeorm.repository';
import { ProductCategoryTypeORMRepository } from './product-categories/product-category-typeorm-repository';
import { ProductCategorySizesTypeORMRepository } from './product-category-sizes/product-category-sizes-typeorm.repository';

@Module({
  imports: [ProductsModule],
  controllers: [
    ProductsController,
    ProductCategoriesController,
    ProductCategorySizesController,
  ],
  providers: [
    ProductsService,
    ProductsTypeORMRepository,
    ProductCategoriesService,
    ProductCategoryTypeORMRepository,
    ProductCategorySizesService,
    ProductCategorySizesTypeORMRepository,
  ],
  exports: [
    ProductsService,
    ProductCategoriesService,
    ProductCategorySizesService,
  ],
})
export class ProductsHttpModule {}
