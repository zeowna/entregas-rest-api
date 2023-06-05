import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractTypeORMEntity } from '../../common/entity/abstract-typeorm.entity';
import { UserTypes } from './user-types.enum';
import { Address } from '../../addresses/entities/address.entity';

@Entity()
export class User extends AbstractTypeORMEntity {
  @Column()
  name: string;

  @Column()
  birthday: Date;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profilePictureURI?: string;

  @Column()
  type: UserTypes;

  @ManyToOne(() => Address, { nullable: true })
  addresses?: Address[];
}
