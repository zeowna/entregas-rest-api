import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsModule } from './products.module';
import { ProductCategoriesController } from './product-categories/product-categories.controller';
import { ProductCategorySizesController } from './product-category-sizes/product-category-sizes.controller';
import { ProductCategoriesService } from './product-categories/product-categories.service';
import { ProductCategorySizesService } from './product-category-sizes/product-category-sizes.service';
import { ProductsRepository } from './products.repository';
import { ProductCategoryRepository } from './product-categories/product-category.repository';
import { ProductCategorySizesRepository } from './product-category-sizes/product-category-sizes.repository';

@Module({
  imports: [ProductsModule],
  controllers: [
    ProductsController,
    ProductCategoriesController,
    ProductCategorySizesController,
  ],
  providers: [
    ProductsService,
    ProductsRepository,
    ProductCategoriesService,
    ProductCategoryRepository,
    ProductCategorySizesService,
    ProductCategorySizesRepository,
  ],
  exports: [
    ProductsService,
    ProductCategoriesService,
    ProductCategorySizesService,
  ],
})
export class ProductsHttpModule {}
