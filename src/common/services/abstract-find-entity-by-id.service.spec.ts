import { MockedEntitiesRepository } from '../repositories/mocks';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateMockedEntityService,
  FindMockedEntityByIdService,
} from './mocks';
import { generateMockedEntityDto } from '../entities/mocks';
import { ZeownaLoggerModule } from '../logger';
import { ID } from '../entities';

describe('AbstractFindEntityByIdService', () => {
  const correlationId = 'any_string';

  let findMockedEntityByIdService: FindMockedEntityByIdService;
  let createMockedEntityService: CreateMockedEntityService;
  let repository: MockedEntitiesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ZeownaLoggerModule.register()],
      providers: [
        FindMockedEntityByIdService,
        CreateMockedEntityService,
        MockedEntitiesRepository,
      ],
    }).compile();

    findMockedEntityByIdService = module.get<FindMockedEntityByIdService>(
      FindMockedEntityByIdService,
    );
    createMockedEntityService = module.get<CreateMockedEntityService>(
      CreateMockedEntityService,
    );
    repository = module.get<MockedEntitiesRepository>(MockedEntitiesRepository);
  });

  it('should be defined', () => {
    expect(findMockedEntityByIdService).toBeDefined();
  });

  describe('execute()', () => {
    it('should reject if no result was found', async () => {
      const id: ID = 'random_id';

      await expect(
        findMockedEntityByIdService.execute(id, correlationId),
      ).rejects.toThrow(`${repository.entityName} not found with id: ${id}`);
    });

    it('should resolve MockedEntity[] if no result were found', async () => {
      await createMockedEntityService.execute(
        generateMockedEntityDto(),
        correlationId,
      );

      const id = repository.data[0].id;
      await expect(
        findMockedEntityByIdService.execute(id, correlationId),
      ).resolves.toEqual(repository.data[0]);
    });
  });
});
