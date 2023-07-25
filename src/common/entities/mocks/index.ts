import { ExcludeMethods } from '../abstract.entity';
import { MockedEntity } from './mocked.entity';
import { MockedEntityDto } from '../../dto/mocked-entity.dto';
import { MockedTypeORMEntity } from './mocked-typeorm.entity';
import { randomInt } from 'crypto';

export const generateMockedEntity = (
  props: ExcludeMethods<MockedEntity> = {},
) =>
  new MockedEntity({
    id: Date.now(),
    mutableProp: 'any_string',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...props,
  });

export const generateMockedEntityDto = (props: Partial<MockedEntityDto> = {}) =>
  new MockedEntityDto({
    mutableProp: 'any_string',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...props,
  });

export const generateMockedTypeORMEntity = (
  props: ExcludeMethods<MockedTypeORMEntity> = {},
) =>
  new MockedTypeORMEntity({
    id: randomInt(9999),
    mutableProp: 'any_string',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...props,
  });

export const generateMockedTypeORMEntityDto = (
  props: Partial<MockedTypeORMEntity> = {},
) =>
  new MockedEntityDto({
    mutableProp: 'any_string',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...props,
  });

export const assertMockedTypeORMEntity = (
  received: MockedTypeORMEntity,
  expected: MockedTypeORMEntity,
  isUpdate = false,
) => {
  expect(received.id).toEqual(expected.id);
  expect(received.mutableProp).toEqual(expected.mutableProp);
  expect(received.createdAt?.toISOString()).toEqual(
    expected.createdAt?.toISOString(),
  );
  if (!isUpdate) {
    expect(received.updatedAt.toISOString()).toEqual(
      expected.updatedAt.toISOString(),
    );
  }
};

export * from './mocked.entity';
export * from './mocked-typeorm.entity';
