import { AbstractDto } from './abstract.dto';
import { MockedEntity } from '../entities/mocks';
import { ID } from '../entities';

export class MockedEntityDto extends AbstractDto<MockedEntity> {
  id: ID;

  mutableProp: string;

  createdAt: Date;

  updatedAt: Date;

  toEntity(): MockedEntity {
    return new MockedEntity({
      id: this.id,
      mutableProp: this.mutableProp,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}
