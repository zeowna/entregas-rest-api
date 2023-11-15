import { ID } from '../entities';

export interface PlainQueryOperators<T> {
  eq?: T | ID;
  ne?: T | ID;
  gt?: T | ID;
  lt?: T | ID;
  gte?: T | ID;
  lte?: T | ID;
  in?: (T | ID)[];
  contains?: T | ID;
  nin?: (T | ID)[];
}
