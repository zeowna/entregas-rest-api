import { AbstractEntity } from '../entities';
import { Paging } from '../inputs';

export abstract class AbstractPagingDto<T extends AbstractEntity> {
  conditions?: string;
  skip?: string;
  limit?: string;
  sort?: string;

  constructor(props: Partial<AbstractPagingDto<any>>) {
    this.conditions = props?.conditions;
    this.skip = props?.skip;
    this.limit = props?.limit;
    this.sort = props?.sort;
  }

  toPaging(): Paging<T> {
    return {
      conditions: JSON.parse(this.conditions ?? null),
      skip: this.skip ? +this.skip : 0,
      limit: this.limit ? +this.limit : 15,
      sort: this.sort ? JSON.parse(null) : { createdAt: -1 },
    };
  }
}
