import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractTypeORMEntity } from '../../common/entity/abstract-typeorm.entity';
import { ProductStatus } from './product-status.enum';
import { ProductCategory } from '../product-categories/entities/product-category.entity';

@Entity()
export class Product extends AbstractTypeORMEntity {
  @Column()
  name: string;

  @ManyToOne(() => ProductCategory)
  category: ProductCategory;

  @Column()
  size: string;

  @Column({ default: ProductStatus.Active })
  status: ProductStatus;

  @Column({ nullable: true })
  pictureURI?: string;
}
