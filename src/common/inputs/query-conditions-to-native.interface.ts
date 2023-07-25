import { AbstractEntity } from '../entities';
import { PlainQueryConditions } from './plain-query-conditions';

export interface QueryConditionsToNativeInterface<T extends AbstractEntity, R> {
  readonly plainConditions: PlainQueryConditions<T>;

  toCondition(): R;
}
