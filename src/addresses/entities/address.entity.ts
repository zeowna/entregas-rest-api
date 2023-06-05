import { Column, Entity } from 'typeorm';
import { AbstractTypeORMEntity } from '../../common/entity/abstract-typeorm.entity';

@Entity()
export class Address extends AbstractTypeORMEntity {
  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  neighbourhood: string;

  @Column()
  number: number;

  @Column({ nullable: true })
  complement?: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
