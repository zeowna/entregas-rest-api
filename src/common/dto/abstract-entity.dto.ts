import { AbstractEntity, ExcludeMethods } from '../entities';

export abstract class AbstractEntityDto<T extends AbstractEntity> {
  constructor(props: ExcludeMethods<AbstractEntityDto<T>>) {
    Object.assign(this, props);
  }

  abstract toEntity(): T;
}
