import { NotFoundException } from '@nestjs/common';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import { Repository } from '../repository/repository.interface';
import { AbstractEntity } from '../entity/abstract-entity.entity';
import { Service } from './service.interface';

export abstract class AbstractService<T = AbstractEntity>
  implements Service<T>
{
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

  async findById(id: number) {
    const found = await this.repository.findById(id);

    if (!found) {
      throw new NotFoundException(
        `${this.repository.entityName} not found with id ${id}`,
      );
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
}
