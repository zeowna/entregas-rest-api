import { AbstractTypeORMEntity } from '../abstract-typeorm.entity';
import { ExcludeMethods } from '../abstract.entity';
import { MockedEntityPresenter } from '../../presenters/mocked-entity.presenter';
import { Column, Entity } from 'typeorm';

@Entity()
export class MockedTypeORMEntity extends AbstractTypeORMEntity {
  @Column()
  mutableProp: string;

  constructor(props: ExcludeMethods<MockedTypeORMEntity>) {
    super(props);
    this.mutableProp = props?.mutableProp;
  }

  present() {
    return new MockedEntityPresenter(this);
  }
}
