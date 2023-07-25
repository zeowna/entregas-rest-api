import { AbstractEntity } from '../entities';
import { PlainQueryConditions } from './plain-query-conditions';
import { SortParams } from '../repositories';

export interface Paging<T extends AbstractEntity> {
  conditions?: PlainQueryConditions<T>;
  skip?: number;
  limit?: number;
  sort?: SortParams<T>;
}
