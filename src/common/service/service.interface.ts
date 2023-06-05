import { AbstractEntity } from '../entity/abstract-entity.entity';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import { DeepPartial } from 'typeorm';

export interface Service<T = AbstractEntity> {
  create(createDTO: T): Promise<T>;

  findAll(
    skip: number,
    limit: number,
    order: FindOptionsOrder<T>,
  ): Promise<T[]>;

  findById(id: number): Promise<T>;

  update(id: number, updateDto: DeepPartial<T>): Promise<T>;

  remove(id: number): Promise<T>;
}
