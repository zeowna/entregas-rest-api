import { AbstractEntity, ID } from '../entities';
import { RepositoryInterface, SortParams } from './repository.interface';
import { PlainQueryConditions, PlainQueryOperators } from '../inputs';

export abstract class AbstractMockedRepository<T extends AbstractEntity>
  implements RepositoryInterface<T>
{
  data: T[] = [];

  constructor(private readonly entityConstructor: new (...args: any[]) => T) {}

  async find(
    conditions: PlainQueryConditions<T>,
    skip: number,
    limit: number,
    sort: SortParams<T>,
  ) {
    return this.data.slice(skip, limit);
  }

  async findById(id: ID) {
    return this.data.find(({ id: entityId }) => entityId === id);
  }

  private applyCondition<TValue>(
    operator: keyof PlainQueryOperators<T>,
    plainOperators: PlainQueryOperators<TValue>,
    value: TValue,
  ) {
    switch (operator) {
      case 'eq':
        return value === plainOperators.eq;
      case 'ne':
        return value !== plainOperators.ne;
      case 'gt':
        return value > plainOperators.gt;
      case 'lt':
        return value < plainOperators.lt;
      case 'gte':
        return value >= plainOperators.gte;
      case 'lte':
        return value <= plainOperators.lte;
      case 'in':
        return plainOperators.in.includes(value);
      case 'nin':
        return !plainOperators.nin.includes(value);
      default:
        return false;
    }
  }

  private filterFindOne<TValue>(
    plainOperators: PlainQueryOperators<TValue>,
    value: TValue,
  ) {
    return Object.keys(plainOperators)
      .map((operator: keyof PlainQueryOperators<T>) =>
        this.applyCondition(operator, plainOperators, value),
      )
      .some((value) => value);
  }

  async findOne(plainConditions: PlainQueryConditions<T>) {
    return this.data.find((entity) =>
      Object.keys(plainConditions)
        .map((param) =>
          this.filterFindOne(plainConditions[param], entity[param]),
        )
        .some((value) => value),
    );
  }

  async create(entity: T) {
    const created = new this.entityConstructor({
      ...entity,
      id: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.data.push(created);

    return created;
  }

  async update(id: ID, entity: Partial<T>) {
    let found = await this.findById(id);

    if (!found) {
      return null;
    }

    found = new this.entityConstructor({
      ...found,
      ...entity,
      id,
      createdAt: found.createdAt,
      updatedAt: new Date(),
    });

    return found;
  }

  async remove(id: ID) {
    const found = await this.findById(id);

    if (found) {
      this.data = this.data.filter(({ id: entityID }) => found.id === entityID);
    }

    return found;
  }

  async count() {
    return this.data.length;
  }

  async createOrUpdate(entity: T) {
    const updated = await this.update(entity.id, entity);

    if (!updated) {
      return this.create(entity);
    }

    return updated;
  }

  get entityName(): string {
    return this.entityConstructor.name;
  }
}
