import { AbstractEntity } from '../entities';
import { RepositoryInterface } from '../repositories';
import { LoggerInterface } from '../logger';
import { AbstractDto } from '../dto';
import { AbstractService } from './abstract.service';

export abstract class AbstractCreateOrUpdateEntityService<
  T extends AbstractEntity,
> extends AbstractService<T> {
  constructor(
    private readonly repositoryImpl: RepositoryInterface<T>,
    private readonly loggerImpl: LoggerInterface,
  ) {
    super(loggerImpl);
  }

  private createOrUpdateEntity(entity: T) {
    return this.repositoryImpl.createOrUpdate(entity);
  }

  async execute(createEntityDto: AbstractDto<T>, correlationId: string) {
    try {
      this.logBefore({ createEntityDto, correlationId });

      const entity = await this.createOrUpdateEntity(
        createEntityDto.toEntity(),
      );

      this.logAfter({ success: true, correlationId, entity });

      return entity;
    } catch (err) {
      this.logAfter({ success: false, correlationId, err });
      throw err;
    }
  }
}
