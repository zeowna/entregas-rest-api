import { AbstractEntity } from '../entities';

export type AbstractFindEntitiesResponseProps<T extends AbstractEntity> = Omit<
  AbstractFindEntitiesResponse<T>,
  'pages'
>;

export abstract class AbstractFindEntitiesResponse<T extends AbstractEntity> {
  readonly list: T[];

  readonly count: number;

  readonly skip: number;

  readonly limit: number;

  readonly pages: number;

  constructor(props: AbstractFindEntitiesResponseProps<T>) {
    this.list = props.list;
    this.count = props.count;
    this.skip = props.skip;
    this.limit = props.limit;

    if (!props.count) {
      this.pages = 0;
      return;
    }

    this.pages = props.count < this.limit ? 1 : this.count / this.limit;
  }
}
