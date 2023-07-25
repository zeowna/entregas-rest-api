import { AbstractEntity } from '../entities';
import { RepositoryInterface } from '../repositories';
import { LoggerInterface } from '../logger';
import { AbstractDto } from '../dto';
import { AbstractService } from './abstract.service';

export abstract class AbstractCreateEntityService<
  T extends AbstractEntity,
> extends AbstractService<T> {
  constructor(
    protected readonly repositoryImpl: RepositoryInterface<T>,
    protected readonly loggerImpl: LoggerInterface,
  ) {
    super(loggerImpl);
  }

  protected async beforeCreate(
    createEntityDto: AbstractDto<T>,
    ...args: any[]
  ) {
    return createEntityDto.toEntity();
  }

  protected async afterCreate(entity: T) {
    return;
  }

  private createEntity(entity: T) {
    return this.repositoryImpl.create(entity);
  }

  async execute(createEntityDto: AbstractDto<T>, correlationId: string) {
    try {
      this.logBefore({ createEntityDto, correlationId });

      const created = await this.createEntity(
        await this.beforeCreate(createEntityDto),
      );

      await this.afterCreate(created);

      this.logBefore({
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
