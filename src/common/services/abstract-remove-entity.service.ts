import { AbstractEntity, ID } from '../entities';
import { RepositoryInterface } from '../repositories';
import { AbstractFindEntityByIdService } from './abstract-find-entity-by-id.service';
import { LoggerInterface } from '../logger';
import { AbstractService } from './abstract.service';

export abstract class AbstractRemoveEntityService<
  T extends AbstractEntity,
> extends AbstractService<T> {
  constructor(
    private readonly repositoryImpl: RepositoryInterface<T>,
    private readonly findByIdUseCaseImpl: AbstractFindEntityByIdService<T>,
    private readonly loggerImpl: LoggerInterface,
  ) {
    super(loggerImpl);
  }

  private async findEntityById(id: ID, correlationId) {
    return this.findByIdUseCaseImpl.execute(id, correlationId);
  }

  async execute(id: ID, correlationId: string) {
    try {
      this.logBefore({ id, correlationId });

      const existing = await this.findEntityById(id, correlationId);
      const removed = await this.repositoryImpl.remove(existing.id);

      this.logAfter({ success: true, removed, correlationId });

      return removed;
    } catch (err) {
      this.logAfter({ success: false, correlationId, err });
      throw err;
    }
  }
}
