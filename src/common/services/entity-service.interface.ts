import { AbstractEntity, ID } from '../entities';
import { PlainQueryConditions } from '../inputs';
import { SortParams } from '../repositories';
import { AbstractEntityDto } from '../dto';

export interface EntityServiceInterface<T extends AbstractEntity> {
  find(
    plainQueryConditions: PlainQueryConditions<T>,
    skip: number,
    limit: number,
    sort: SortParams<T>,
    correlationId: string,
  ): Promise<T[]>;

  findById(id: ID, correlationId: string): Promise<T>;

  create(
    createEntityDto: AbstractEntityDto<T>,
    correlationId: string,
  ): Promise<T>;

  update(
    id: any,
    updateEntityDto: AbstractEntityDto<T>,
    correlationId: string,
  ): Promise<T>;

  remove(id: ID, correlationId: string): Promise<T>;

  createOrUpdate(
    createEntityDto: AbstractEntityDto<T>,
    correlationId: string,
  ): Promise<T>;
}
