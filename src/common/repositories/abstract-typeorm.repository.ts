import { AbstractTypeORMEntity, ID } from '../entities';
import { Repository } from 'typeorm';
import { RepositoryInterface, SortParams } from './repository.interface';
import { PlainQueryConditions } from '../inputs';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import { QueryTypeormConditions } from './query-typeorm-conditions';

export abstract class AbstractTypeORMRepository<T extends AbstractTypeORMEntity>
  implements RepositoryInterface<T>
{
  constructor(private readonly typeORMRepositoryImpl: Repository<T>) {}

  async create(entity: T) {
    return this.typeORMRepositoryImpl.save(
      this.typeORMRepositoryImpl.create(entity),
    );
  }

  async find(
    plainConditions: PlainQueryConditions<T>,
    skip: number,
    limit: number,
    sort: SortParams<T>,
  ) {
    const typeormConditions = new QueryTypeormConditions(
      plainConditions,
    ).toCondition();

    return this.typeORMRepositoryImpl.find({
      where: typeormConditions,
      skip,
      take: limit,
      order: sort as FindOptionsOrder<T>,
    });
  }

  async findById(id: ID) {
    return this.typeORMRepositoryImpl.findOneBy({ id } as any);
  }

  async update(id: ID, entity: T) {
    const found = await this.findById(id);

    if (!found) {
      return null;
    }

    return this.typeORMRepositoryImpl.save(
      this.typeORMRepositoryImpl.create({
        ...found,
        ...entity,
        id,
      }),
    );
  }

  async remove(id: ID) {
    const entity = await this.findById(id);

    if (!entity) {
      return null;
    }

    const toRemove = this.typeORMRepositoryImpl.create({ ...entity });

    await this.typeORMRepositoryImpl.remove(toRemove);

    return entity;
  }

  async count(plainConditions: PlainQueryConditions<T>): Promise<number> {
    const typeormConditions = new QueryTypeormConditions(
      plainConditions,
    ).toCondition();

    return this.typeORMRepositoryImpl.count({
      where: typeormConditions,
    });
  }

  async createOrUpdate(entity: T): Promise<T> {
    const updated = await this.update(entity.id, entity);

    if (updated) {
      return updated;
    }

    return this.create(entity);
  }

  get entityName() {
    return this.typeORMRepositoryImpl?.metadata?.name;
  }
}
