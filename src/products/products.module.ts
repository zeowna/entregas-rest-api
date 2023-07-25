import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { ProductCategorySize } from './entities/product-category-size.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductCategory, ProductCategorySize]),
  ],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
