import { AbstractEntity } from '../entities';
import { RepositoryInterface } from '../repositories';
import { LoggerInterface } from '../logger';
import { PlainQueryConditions } from '../inputs';
import { AbstractService } from './abstract.service';

export abstract class AbstractCountEntitiesService<
  T extends AbstractEntity,
> extends AbstractService<number> {
  constructor(
    private readonly repositoryImpl: RepositoryInterface<T>,
    private readonly loggerImpl: LoggerInterface,
  ) {
    super(loggerImpl);
  }

  private async count(plainConditions: PlainQueryConditions<T>) {
    return this.repositoryImpl.count(plainConditions);
  }

  async execute(
    plainConditions: PlainQueryConditions<T>,
    correlationId: string,
    extraParams?: Record<string, any>,
  ) {
    try {
      this.logBefore({ correlationId, extraParams });

      const count = await this.count(plainConditions);

      this.logAfter({ success: true, count, correlationId, extraParams });

      return count;
    } catch (err) {
      this.logAfter({ success: false, correlationId, extraParams, err });
      throw err;
    }
  }
}
