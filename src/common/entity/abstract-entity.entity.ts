export abstract class AbstractEntity {
  abstract readonly id?: number;
  abstract readonly createdAt?: Date;
  abstract readonly updatedAt?: Date;

  present(): Partial<this> {
    return this;
  }
}
