import { AbstractPagingDto } from '../../common';
import { Product } from '../entities/product.entity';

export class ProductPagingDto extends AbstractPagingDto<Product> {}
