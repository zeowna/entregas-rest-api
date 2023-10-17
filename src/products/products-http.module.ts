import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsModule } from './products.module';
import { ProductCategoriesController } from './controllers/product-categories.controller';
import { ProductCategorySizesController } from './controllers/product-category-sizes.controller';
import { ProductCategoriesTypeORMRepository } from './repositories/product-categories-typeorm.repository';
import { CreateProductCategoryService } from './services/create-product-category.service';
import { CountProductCategoriesService } from './services/count-product-categories.service';
import { FindProductCategoriesService } from './services/find-product-categories.service';
import { FindProductCategoryByIdService } from './services/find-product-category-by-id.service';
import { UpdateProductCategoryService } from './services/update-product-category.service';
import { FindProductCategoryByNameService } from './services/find-product-category-by-name.service';

@Module({
  imports: [ProductsModule],
  controllers: [
    ProductsController,
    ProductCategoriesController,
    ProductCategorySizesController,
  ],
  providers: [
    ProductCategoriesTypeORMRepository,
    CountProductCategoriesService,
    FindProductCategoriesService,
    FindProductCategoryByIdService,
    CreateProductCategoryService,
    UpdateProductCategoryService,
    FindProductCategoryByNameService,
  ],
})
export class ProductsHttpModule {}
