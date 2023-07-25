import { AbstractEntity } from '../entities';
import { RepositoryInterface, SortParams } from '../repositories';
import { LoggerInterface } from '../logger';
import { AbstractCountEntitiesService } from './abstract-count-entities.service';
import {
  AbstractFindEntitiesResponse,
  AbstractFindEntitiesResponseProps,
} from './abstract-find-entities.response';
import { PlainQueryConditions } from '../inputs';
import { AbstractService } from './abstract.service';
import { AbstractPagingDto } from '../dto';

export abstract class AbstractFindEntitiesService<
  T extends AbstractEntity,
  R extends AbstractFindEntitiesResponse<T>,
> extends AbstractService<AbstractFindEntitiesResponse<T>> {
  constructor(
    private readonly repositoryImpl: RepositoryInterface<T>,
    private readonly countEntitiesServiceImpl: AbstractCountEntitiesService<T>,
    private readonly loggerImpl: LoggerInterface,
    private readonly findEntitiesResponseConstructor: new (
      props: AbstractFindEntitiesResponseProps<T>,
    ) => R,
  ) {
    super(loggerImpl);
  }

  private async count(
    plainConditions: PlainQueryConditions<T>,
    correlationId: string,
  ) {
    return this.countEntitiesServiceImpl.execute(
      plainConditions,
      correlationId,
    );
  }

  private async find(
    plainConditions: PlainQueryConditions<T>,
    skip: number,
    limit: number,
    sort: SortParams<T>,
  ) {
    return this.repositoryImpl.find(plainConditions, skip, limit, sort);
  }

  async execute(pagingDto: AbstractPagingDto<T>, correlationId: string) {
    try {
      const paging = pagingDto.toPaging();

      this.logBefore({
        paging,
        correlationId,
      });

      const [count, list] = await Promise.all([
        this.count(paging.conditions, correlationId),
        this.find(paging.conditions, paging.skip, paging.limit, paging.sort),
      ]);

      const found = new this.findEntitiesResponseConstructor({
        list,
        count,
        skip: paging.skip,
        limit: paging.limit,
      });

      this.logAfter({
        success: true,
        correlationId,
        count,
        found,
      });

      return found;
    } catch (err) {
      this.logAfter({ success: false, correlationId, err });
      throw err;
    }
  }
}
