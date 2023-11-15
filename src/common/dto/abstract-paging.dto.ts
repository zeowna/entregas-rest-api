import { AbstractEntity } from '../entities';
import { Paging, PlainQueryConditions } from '../inputs';
import { SortParams } from '../repositories';

interface AbstractPagingDtoProps {
  conditions?: string;
  skip?: string;
  limit?: string;
  sort?: string;
}

export abstract class AbstractPagingDto<T extends AbstractEntity>
  implements Paging<T>
{
  conditions?: PlainQueryConditions<T>;
  skip?: number;
  limit?: number;
  sort?: SortParams<T>;

  constructor(props: Partial<AbstractPagingDtoProps>) {
    this.conditions = JSON.parse(props?.conditions ?? null);
    this.skip = props?.skip ? +props.skip : 0;
    this.limit = props?.limit ? +props.limit : 15;
    this.sort = props?.sort ? JSON.parse(props.sort) : { createdAt: -1 };
  }

  toPaging(): Paging<T> {
    return this;
  }
}
