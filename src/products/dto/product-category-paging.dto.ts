import { AbstractPagingDto } from '../../common';
import { ProductCategory } from '../entities/product-category.entity';

export class ProductCategoryPagingDto extends AbstractPagingDto<ProductCategory> {}
