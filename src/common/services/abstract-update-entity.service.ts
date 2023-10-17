import { AbstractEntity, ID } from '../entities';
import { RepositoryInterface } from '../repositories';
import { AbstractFindEntityByIdService } from './abstract-find-entity-by-id.service';
import { LoggerInterface } from '../logger';
import { AbstractEntityDto } from '../dto';
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

  protected async beforeUpdate(
    id: ID,
    updateEntityDto: AbstractEntityDto<T>,
    correlationId: string,
  ) {
    return updateEntityDto.toEntity();
  }

  protected async afterUpdate(id: ID, entity: T, correlationId: string) {
    return;
  }

  private async findById(id: ID, correlationId) {
    return this.findByIdUseCaseImpl.execute(id, correlationId);
  }

  async execute(
    id: ID,
    updateEntityDto: AbstractEntityDto<T>,
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
        await this.beforeUpdate(id, updateEntityDto, correlationId),
      );

      await this.afterUpdate(id, updated, correlationId);

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
