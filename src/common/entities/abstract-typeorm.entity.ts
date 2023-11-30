import { AbstractEntity, ID } from './abstract.entity';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractTypeORMEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id?: ID;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
