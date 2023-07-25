import { Test, TestingModule } from '@nestjs/testing';
import { MockedTypeORMModuleFactory } from '../modules';
import { dataSourceTestOptions } from '../../../db/data-source';
import { MockedEntitiesTypeORMRepository } from './mocks';
import {
  assertMockedTypeORMEntity,
  generateMockedTypeORMEntity,
  MockedTypeORMEntity,
} from '../entities/mocks';
import { randomInt } from 'crypto';

describe('MockedTypeORMRepository', () => {
  const MockedTypeORMModule = MockedTypeORMModuleFactory.usePgMem();
  let repository: MockedEntitiesTypeORMRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MockedTypeORMModule.forRoot(dataSourceTestOptions),
        MockedTypeORMModule.forFeature([MockedTypeORMEntity]),
      ],
      providers: [MockedEntitiesTypeORMRepository],
    }).compile();

    repository = module.get<MockedEntitiesTypeORMRepository>(
      MockedEntitiesTypeORMRepository,
    );
  });

  afterEach(async () => {
    await MockedTypeORMModule.disconnect();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll()', () => {
    it('should be defined', () => {
      expect(repository.find).toBeDefined();
    });

    it('should resolve [] if no result were found', async () => {
      const mock = [];

      await expect(
        repository.find({}, 0, 10, { createdAt: -1 }),
      ).resolves.toEqual(mock);
    });

    it('should resolve MockedEntity[] if no result were found', async () => {
      const first = await repository.create(generateMockedTypeORMEntity());
      const second = await repository.create(generateMockedTypeORMEntity());
      const third = await repository.create(generateMockedTypeORMEntity());

      const [result1, result2, result3] = await repository.find(null, 0, 10, {
        createdAt: 1,
      });

      assertMockedTypeORMEntity(result1, first);
      assertMockedTypeORMEntity(result2, second);
      assertMockedTypeORMEntity(result3, third);
    });
  });

  describe('findById()', () => {
    it('should be defined', () => {
      expect(repository.findById).toBeDefined();
    });

    it('should resolve null if no result were found', async () => {
      const id = randomInt(9999);
      const found = null;
      await expect(repository.findById(id)).resolves.toEqual(found);
    });

    it('should resolve MockedEntity[] if no result were found', async () => {
      const expected = await repository.create(generateMockedTypeORMEntity());
      const id = expected.id;

      const result = await repository.findById(id);

      assertMockedTypeORMEntity(result, expected);
    });
  });

  describe('create()', () => {
    it('should be defined', () => {
      expect(repository.create).toBeDefined();
    });

    it('should resolve the created MockedEntity', async () => {
      const created = generateMockedTypeORMEntity({
        id: randomInt(9999),
      });
      const result = await repository.create(created);
      const expected = generateMockedTypeORMEntity({
        ...created,
        id: result.id,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      });

      assertMockedTypeORMEntity(result, expected);
    });
  });

  describe('update()', () => {
    it('should be defined', () => {
      expect(repository.update).toBeDefined();
    });

    it("should reject if entity doesn't exists", async () => {
      const updated = generateMockedTypeORMEntity();

      const found = null;
      await expect(repository.update(updated.id, updated)).resolves.toEqual(
        found,
      );
    });

    it('should resolve the updated MockedEntity', async () => {
      const created = await repository.create(generateMockedTypeORMEntity());

      const updated = new MockedTypeORMEntity({
        ...created,
        mutableProp: 'another_string',
      });

      const result = await repository.update(created.id, updated);

      assertMockedTypeORMEntity(result, updated, true);
    });
  });

  describe('remove()', () => {
    it('should be defined', () => {
      expect(repository.remove).toBeDefined();
    });

    it("should reject if entities doesn't exists", async () => {
      const id = randomInt(9999);
      const expected = null;

      await expect(repository.remove(id)).resolves.toEqual(expected);
    });

    it('should resolve the removed MockedEntity', async () => {
      const expected = await repository.create(generateMockedTypeORMEntity());
      const id = expected.id;

      const result = await repository.remove(id);
      console.log({ expected, result });

      assertMockedTypeORMEntity(result, expected);
    });
  });

  describe('createOrUpdate()', () => {
    it('should be defined', () => {
      expect(repository.createOrUpdate).toBeDefined();
    });

    it('should resolve a created MockedEntity', async () => {
      const created = generateMockedTypeORMEntity();
      const result = await repository.createOrUpdate(created);

      const expected = generateMockedTypeORMEntity({
        ...created,
        id: result.id,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      });

      assertMockedTypeORMEntity(result, expected);
    });

    it('should resolve a updated MockedEntity', async () => {
      const existing = await repository.create(generateMockedTypeORMEntity());
      const expected = generateMockedTypeORMEntity({
        ...existing,
        mutableProp: 'another_string',
      });

      const result = await repository.createOrUpdate(expected);

      assertMockedTypeORMEntity(result, expected, true);
    });
  });
});
