import { AbstractEntity, ExcludeMethods, ID } from '../entities';

export abstract class AbstractEntityPresenter<T extends AbstractEntity>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  implements ExcludeMethods<T>
{
  id: ID;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: T) {
    this.id = props?.id;
    this.createdAt = props?.createdAt;
    this.updatedAt = props?.updatedAt;
  }
}
