import { AbstractTypeORMEntity } from '../entity/abstract-typeorm.entity';
import { DeepPartial, Repository as TypeORMRepository } from 'typeorm';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import { Repository } from './repository.interface';

export abstract class AbstractTypeORMRepository<T = AbstractTypeORMEntity>
  implements Repository<T>
{
  constructor(private readonly repository: TypeORMRepository<T>) {}

  get entityName() {
    return this.repository.metadata.name;
  }

  async create(item: T) {
    return this.repository.save(this.repository.create(item));
  }

  async findAll(skip: number, limit: number, order: FindOptionsOrder<T>) {
    return this.repository.find({
      skip,
      take: limit,
      order,
    });
  }

  async findById(id: number) {
    return this.repository.findOne({ where: { id } as any });
  }

  async update(id: number, user: DeepPartial<T>) {
    return this.repository.save(
      this.repository.create({
        id,
        ...user,
      }),
    );
  }

  async remove(id: number) {
    return this.repository.remove(await this.findById(id));
  }
}
