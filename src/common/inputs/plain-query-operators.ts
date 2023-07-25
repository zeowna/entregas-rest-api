export interface PlainQueryOperators<T> {
  eq?: T;
  ne?: T;
  gt?: T;
  lt?: T;
  gte?: T;
  lte?: T;
  in?: T[];
  nin?: T[];
}
