import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import { DeepPartial } from 'typeorm';
import { AbstractEntity } from '../entity/abstract-entity.entity';

export interface Repository<T = AbstractEntity> {
  entityName: string;

  create(item: T): Promise<T>;

  findAll(
    skip: number,
    limit: number,
    order: FindOptionsOrder<T>,
  ): Promise<T[]>;

  findById(id: number): Promise<T>;

  update(id: number, user: DeepPartial<T>): Promise<T>;

  remove(id: number): Promise<T>;
}
