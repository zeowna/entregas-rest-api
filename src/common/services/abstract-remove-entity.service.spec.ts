import { MockedEntitiesRepository } from '../repositories/mocks';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateMockedEntityService,
  FindMockedEntityByIdService,
  RemoveMockedEntityService,
} from './mocks';
import { generateMockedEntityDto } from '../entities/mocks';
import { ZeownaLoggerModule } from '../logger';

describe('AbstractRemoveEntityService', () => {
  const correlationId = 'any_string';

  let removeMockedEntityService: RemoveMockedEntityService;
  let createMockedEntityService: CreateMockedEntityService;
  let repository: MockedEntitiesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ZeownaLoggerModule.register()],
      providers: [
        FindMockedEntityByIdService,
        RemoveMockedEntityService,
        CreateMockedEntityService,
        MockedEntitiesRepository,
      ],
    }).compile();

    removeMockedEntityService = module.get<RemoveMockedEntityService>(
      RemoveMockedEntityService,
    );
    createMockedEntityService = module.get<CreateMockedEntityService>(
      CreateMockedEntityService,
    );
    repository = module.get<MockedEntitiesRepository>(MockedEntitiesRepository);
  });

  it('should be defined', () => {
    expect(removeMockedEntityService).toBeDefined();
  });

  describe('execute()', () => {
    it("should reject if entities doesn't exists", async () => {
      const entity = generateMockedEntityDto({ id: 'random_id' });
      await expect(
        removeMockedEntityService.execute(entity.id, correlationId),
      ).rejects.toThrow(
        `${repository.entityName} not found with id: ${entity.id}`,
      );
    });

    it('should resolve the removed MockedEntity', async () => {
      const entity = await createMockedEntityService.execute(
        generateMockedEntityDto(),
        correlationId,
      );

      const result = await removeMockedEntityService.execute(
        entity.id,
        correlationId,
      );

      expect(result).toEqual(entity);
    });
  });
});
