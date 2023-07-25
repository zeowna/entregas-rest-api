import { Injectable } from '@nestjs/common';
import { MockedEntity } from '../../entities/mocks';
import { AbstractMockedRepository } from '../../repositories';

@Injectable()
export class MockedEntitiesRepository extends AbstractMockedRepository<MockedEntity> {
  constructor() {
    super(MockedEntity);
  }
}
