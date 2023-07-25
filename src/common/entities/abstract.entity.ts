import { AbstractEntityPresenter } from '../presenters';

export type ID = string | number;

export type ExcludeMethods<T> = Pick<
  Partial<T>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  { [P in keyof T]: T[P] extends Function ? never : P }[keyof T]
>;

export abstract class AbstractEntity {
  readonly id?: ID;

  readonly createdAt?: Date;

  readonly updatedAt?: Date;

  constructor(props: ExcludeMethods<AbstractEntity>) {
    this.id = props?.id;
    this.createdAt = props?.createdAt;
    this.updatedAt = props?.updatedAt;
  }

  abstract present(): AbstractEntityPresenter<AbstractEntity>;
}
