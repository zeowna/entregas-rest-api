import { AbstractEntity, ExcludeMethods } from '../entities';

export abstract class AbstractDto<T extends AbstractEntity> {
  constructor(props: ExcludeMethods<AbstractDto<T>>) {
    Object.assign(this, props);
  }

  abstract toEntity(): T;
}
