import { AbstractEntity } from '../entities';
import { RepositoryInterface } from '../repositories';
import { LoggerInterface } from '../logger';
import { AbstractEntityDto } from '../dto';
import { AbstractService } from './abstract.service';

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
  ) {
    return createEntityDto.toEntity();
  }

  protected async afterCreate(entity: T, correlationId: string) {
    return;
  }

  private createEntity(entity: T) {
    return this.repositoryImpl.create(entity);
  }

  async execute(createEntityDto: AbstractEntityDto<T>, correlationId: string) {
    try {
      this.logBefore({ createEntityDto, correlationId });

      const created = await this.createEntity(
        await this.beforeCreate(createEntityDto, correlationId),
      );

      await this.afterCreate(created, correlationId);

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
