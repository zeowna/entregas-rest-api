import { NotFoundException } from '@nestjs/common';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import { Repository } from '../repository/repository.interface';
import { AbstractEntity } from '../entity/abstract-entity.entity';
import { Service } from './service.interface';
import { I18nContext } from 'nestjs-i18n';

export abstract class AbstractService<T = AbstractEntity>
  implements Service<T>
{
  protected i18n: I18nContext;

  constructor(private readonly repository: Repository<T>) {}

  async create(createDTO: T | any) {
    return this.repository.create(createDTO);
  }

  async findAll(
    skip = 0,
    limit = 10,
    order: FindOptionsOrder<T> = { createdAt: 'DESC' } as any,
  ) {
    return this.repository.findAll(skip, limit, order);
  }

  protected getNotFoundMessage(param: keyof T, value: any) {
    if (this.i18n) {
      return this.i18n.t('validation.entity.notFound', {
        args: {
          entityName: this.i18n.t(
            `entity.${this.repository.entityName}.entityName`,
          ),
          param: this.i18n.t(
            `entity.${this.repository.entityName}.properties.${
              param as string
            }`,
          ),
          value,
        },
      });
    }

    return `${this.repository.entityName} not found with ${
      param as string
    }: ${value}`;
  }

  async findById(id: number) {
    const found = await this.repository.findById(id);

    if (!found) {
      throw new NotFoundException(this.getNotFoundMessage('id' as any, id));
    }

    return found;
  }

  async update(id: number, updateDto: T | any) {
    const found = await this.findById(id);

    return this.repository.update((found as any).id, {
      ...found,
      ...updateDto,
    });
  }

  async remove(id: number) {
    const found = await this.findById(id);

    return this.repository.remove((found as any).id);
  }

  setI18n(i18n: I18nContext) {
    this.i18n = i18n;
  }
}
