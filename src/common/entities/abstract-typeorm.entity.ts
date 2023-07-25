import { AbstractEntity, ID } from './abstract.entity';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractTypeORMEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  readonly id?: ID;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
