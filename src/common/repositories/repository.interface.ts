import { AbstractEntity, ID } from '../entities';
import { PlainQueryConditions } from '../inputs';

export type SortParams<T extends AbstractEntity> = Partial<
  Record<keyof T, 1 | -1>
>;

export interface RepositoryInterface<T extends AbstractEntity> {
  find(
    conditions: PlainQueryConditions<T>,
    skip: number,
    limit: number,
    sort: SortParams<T>,
  ): Promise<T[]>;

  findById(id: ID): Promise<T>;

  create(entity: T): Promise<T>;

  update(id: ID, entity: Partial<T>): Promise<T>;

  count(conditions: PlainQueryConditions<T>): Promise<number>;

  createOrUpdate(entity: T): Promise<T>;

  remove(id: ID): Promise<T>;

  get entityName(): string;
}
