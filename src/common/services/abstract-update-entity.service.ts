import { AbstractEntity, ID } from '../entities';
import { RepositoryInterface } from '../repositories';
import { AbstractFindEntityByIdService } from './abstract-find-entity-by-id.service';
import { LoggerInterface } from '../logger';
import { AbstractDto } from '../dto';
import { AbstractService } from './abstract.service';

export abstract class AbstractUpdateEntityService<
  T extends AbstractEntity,
> extends AbstractService<T> {
  constructor(
    private readonly repositoryImpl: RepositoryInterface<T>,
    private readonly findByIdUseCaseImpl: AbstractFindEntityByIdService<T>,
    private readonly loggerImpl: LoggerInterface,
  ) {
    super(loggerImpl);
  }

  protected async beforeUpdate(updateEntityDto: AbstractDto<T>) {
    return updateEntityDto.toEntity();
  }

  protected async afterUpdate(entity: T) {
    return;
  }

  private async findById(id: ID, correlationId) {
    return this.findByIdUseCaseImpl.execute(id, correlationId);
  }

  async execute(
    id: ID,
    updateEntityDto: AbstractDto<T>,
    correlationId: string,
  ) {
    try {
      this.logBefore({
        id,
        updateEntityDto,
        correlationId,
      });

      const existing = await this.findById(id, correlationId);
      const updated = await this.repositoryImpl.update(
        (existing as AbstractEntity).id,
        await this.beforeUpdate(updateEntityDto),
      );

      await this.afterUpdate(updated);

      this.logAfter({
        success: true,
        updated,
        correlationId,
      });

      return updated;
    } catch (err) {
      this.logAfter({ success: false, correlationId, err });
      throw err;
    }
  }
}
