import { AbstractEntity, ID } from '../entities';
import { RepositoryInterface } from '../repositories';
import { LoggerInterface } from '../logger';
import { NotFoundException } from '@nestjs/common';
import { AbstractService } from './abstract.service';

export class AbstractFindEntityByIdService<
  T extends AbstractEntity,
> extends AbstractService<T> {
  errMessage = `${this.repositoryImpl.entityName} not found with id`;

  constructor(
    private readonly repositoryImpl: RepositoryInterface<T>,
    private readonly loggerImpl: LoggerInterface,
  ) {
    super(loggerImpl);
  }

  private async findById(id: ID) {
    return this.repositoryImpl.findById(id);
  }

  async execute(id: ID, correlationId: string) {
    try {
      this.logBefore({ id, correlationId });

      const found = await this.findById(id);

      if (!found) {
        throw new NotFoundException(
          `${this.repositoryImpl.entityName} not found with id: ${id}`,
        );
      }

      this.logAfter({ success: true, found, id, correlationId });

      return found;
    } catch (err) {
      this.logAfter({ success: false, correlationId, err });
      throw err;
    }
  }
}
