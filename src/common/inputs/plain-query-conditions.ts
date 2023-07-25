import { AbstractEntity } from '../entities';
import { PlainQueryOperators } from './plain-query-operators';

export type PlainQueryConditions<T extends AbstractEntity> = {
  [P in keyof T]?: PlainQueryOperators<T[P]>;
} & { or?: PlainQueryConditions<T>[] };
