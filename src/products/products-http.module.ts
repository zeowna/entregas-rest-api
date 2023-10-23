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
import { FindProductCategorySizesService } from './services/find-product-category-sizes.service';
import { ProductCategorySizesTypeORMRepository } from './repositories/product-category-sizes-typeorm.repository';
import { CountProductCategorySizesService } from './services/count-product-category-sizes.service';
import { FindProductCategorySizeByCategoryIdAndNameService } from './services/find-product-category-size-by-category-id-and-name.service';
import { CreateProductCategorySizeService } from './services/create-product-category-sizes.service';
import { FindProductCategorySizeByIdService } from './services/find-product-category-size-by-id.service';
import { UpdateProductCategorySizeService } from './services/update-product-category-size.service';
import { CreateProductService } from './services/create-product.service';
import { FindProductByNameService } from './services/find-product-by-name.service';
import { ProductsTypeORMRepository } from './repositories/products-typeorm.repository';
import { FindProductsService } from './services/find-products.service';
import { CountProductsService } from './services/count-products.service';
import { FindProductByIdService } from './services/find-product-id.service';
import { UpdateProductService } from './services/update-product.service';
import { UploadProductPictureService } from './services/upload-product-picture.service';

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
    ProductCategorySizesTypeORMRepository,
    CountProductCategorySizesService,
    FindProductCategoryByNameService,
    FindProductCategorySizesService,
    FindProductCategorySizeByIdService,
    FindProductCategorySizeByCategoryIdAndNameService,
    CreateProductCategorySizeService,
    UpdateProductCategorySizeService,
    ProductsTypeORMRepository,
    FindProductByNameService,
    FindProductByIdService,
    CountProductsService,
    FindProductsService,
    CreateProductService,
    UpdateProductService,
    UploadProductPictureService,
  ],
})
export class ProductsHttpModule {}
