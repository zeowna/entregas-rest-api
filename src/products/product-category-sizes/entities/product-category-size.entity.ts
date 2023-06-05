import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductCategory } from '../../product-categories/entities/product-category.entity';
import { AbstractTypeORMEntity } from '../../../common/entity/abstract-typeorm.entity';

@Entity()
export class ProductCategorySize extends AbstractTypeORMEntity {
  @Column()
  name: string;

  @ManyToOne(() => ProductCategory)
  category: ProductCategory;
}
