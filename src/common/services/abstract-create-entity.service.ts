import { AbstractEntity } from '../entities';
import { RepositoryInterface } from '../repositories';
import { LoggerInterface } from '../logger';
import { AbstractEntityDto } from '../dto';
import { AbstractService } from './abstract.service';
import { I18nContext } from 'nestjs-i18n';
import { DatabaseTransactionRunnerInterface } from '../database-transactions';

export abstract class AbstractCreateEntityService<
  T extends AbstractEntity,
> extends AbstractService<T> {
  constructor(
    private readonly repositoryImpl: RepositoryInterface<T>,
    private readonly loggerImpl: LoggerInterface,
  ) {
    super(loggerImpl);
  }

  protected async beforeCreate(
    createEntityDto: AbstractEntityDto<T>,
    correlationId: string,
    i18n?: I18nContext,
  ) {
    return createEntityDto.toEntity();
  }

  protected async afterCreate(
    createEntityDto: AbstractEntityDto<T>,
    entity: T,
    correlationId: string,
    i18n?: I18nContext,
  ) {
    return;
  }

  private createEntity(
    entity: T,
    i18n?: I18nContext,
    transactionRunnerImpl?: DatabaseTransactionRunnerInterface,
  ) {
    return this.repositoryImpl.create(entity, transactionRunnerImpl);
  }

  async execute(
    createEntityDto: AbstractEntityDto<T>,
    correlationId: string,
    i18n?: I18nContext,
    transactionRunnerImpl?: DatabaseTransactionRunnerInterface,
  ) {
    try {
      this.logBefore({ createEntityDto, correlationId });

      const created = await this.createEntity(
        await this.beforeCreate(createEntityDto, correlationId, i18n),
        i18n,
        transactionRunnerImpl,
      );

      await this.afterCreate(createEntityDto, created, correlationId, i18n);

      this.logAfter({
        success: true,
        created,
        createEntityDto,
        correlationId,
      });

      return created;
    } catch (err) {
      this.logAfter({ success: false, correlationId, err });

      throw err;
    }
  }
}
