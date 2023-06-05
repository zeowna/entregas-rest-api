import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractTypeORMEntity } from '../../common/entity/abstract-typeorm.entity';
import { Address } from '../../addresses/entities/address.entity';

@Entity()
export class Partner extends AbstractTypeORMEntity {
  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column({ nullable: true })
  pictureURI?: string;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;
}
