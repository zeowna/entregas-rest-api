import { Column, Entity } from 'typeorm';
import { AbstractTypeORMEntity } from '../../../common/entity/abstract-typeorm.entity';

@Entity()
export class ProductCategory extends AbstractTypeORMEntity {
  @Column({ unique: true })
  name: string;
}
