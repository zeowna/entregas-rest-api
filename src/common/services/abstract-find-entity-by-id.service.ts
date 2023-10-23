import { AbstractEntity, ID } from '../entities';
import { RepositoryInterface } from '../repositories';
import { LoggerInterface } from '../logger';
import { NotFoundException } from '@nestjs/common';
import { AbstractService } from './abstract.service';
import { I18nContext } from 'nestjs-i18n';

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

  async execute(id: ID, correlationId: string, i18n?: I18nContext) {
    try {
      this.logBefore({ id, correlationId });

      const found = await this.findById(id);

      if (!found) {
        throw new NotFoundException(
          i18n.translate('validation.entity.notFound', {
            args: {
              entityName: i18n.translate(
                `entity.${this.repositoryImpl.entityName}.entityName`,
              ),
              param: i18n.translate(
                `entity.${this.repositoryImpl.entityName}.properties.id`,
              ),
              value: id,
            },
          }),
          //`${this.repositoryImpl.entityName} not found with id: ${id}`,
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
