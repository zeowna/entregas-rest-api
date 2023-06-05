import { AbstractEntity } from './abstract-entity.entity';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractTypeORMEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
