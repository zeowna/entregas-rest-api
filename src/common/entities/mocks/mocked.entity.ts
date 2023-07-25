import { AbstractEntity, ExcludeMethods } from '../abstract.entity';
import { MockedEntityPresenter } from '../../presenters/mocked-entity.presenter';

export class MockedEntity extends AbstractEntity {
  mutableProp: string;

  constructor(props: ExcludeMethods<MockedEntity>) {
    super(props);
    this.mutableProp = props?.mutableProp;
  }

  present() {
    return new MockedEntityPresenter(this);
  }
}
