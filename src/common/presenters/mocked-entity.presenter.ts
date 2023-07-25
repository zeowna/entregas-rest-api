import { AbstractEntityPresenter } from './abstract-entity.presenter';
import { MockedEntity } from '../entities/mocks';
import { ID } from '../entities';

export class MockedEntityPresenter extends AbstractEntityPresenter<MockedEntity> {
  id: ID;
  mutableProp: string;
  createdAt: Date;
  updated: Date;

  constructor(props: MockedEntity) {
    super(props);
  }
}
