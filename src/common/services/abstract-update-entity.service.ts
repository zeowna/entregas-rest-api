import { AbstractEntity, ID } from '../entities';
import { RepositoryInterface } from '../repositories';
import { AbstractFindEntityByIdService } from './abstract-find-entity-by-id.service';
import { LoggerInterface } from '../logger';
import { AbstractEntityDto } from '../dto';
import { AbstractService } from './abstract.service';
import { I18nContext } from 'nestjs-i18n';
import { DatabaseTransactionRunnerInterface } from '../database-transactions';

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
    i18n?: I18nContext,
  ) {
    return updateEntityDto.toEntity();
  }

  protected async afterUpdate(
    id: ID,
    entity: T,
    correlationId: string,
    i18n?: I18nContext,
  ) {
    return;
  }

  private async findById(id: ID, correlationId) {
    return this.findByIdUseCaseImpl.execute(id, correlationId);
  }

  async execute(
    id: ID,
    updateEntityDto: AbstractEntityDto<T>,
    correlationId: string,
    i18n?: I18nContext,
    transactionRunner?: DatabaseTransactionRunnerInterface,
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
        await this.beforeUpdate(id, updateEntityDto, correlationId, i18n),
        transactionRunner,
      );

      await this.afterUpdate(id, updated, correlationId, i18n);

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
