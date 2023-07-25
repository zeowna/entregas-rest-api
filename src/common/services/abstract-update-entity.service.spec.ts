import { MockedEntitiesRepository } from '../repositories/mocks';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateMockedEntityService,
  FindMockedEntityByIdService,
} from './mocks';
import { UpdateMockedEntityService } from './mocks/update-mocked-entity.service';
import { ZeownaLoggerModule } from '../logger';
import { generateMockedEntityDto } from '../entities/mocks';

describe('AbstractUpdateEntityService', () => {
  const correlationId = 'any_string';

  let updateMockedEntityService: UpdateMockedEntityService;
  let createMockedEntityService: CreateMockedEntityService;
  let repository: MockedEntitiesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ZeownaLoggerModule.register()],
      providers: [
        FindMockedEntityByIdService,
        UpdateMockedEntityService,
        CreateMockedEntityService,
        MockedEntitiesRepository,
      ],
    }).compile();

    updateMockedEntityService = module.get<UpdateMockedEntityService>(
      UpdateMockedEntityService,
    );
    createMockedEntityService = module.get<CreateMockedEntityService>(
      CreateMockedEntityService,
    );
    repository = module.get<MockedEntitiesRepository>(MockedEntitiesRepository);
  });

  it('should be defined', () => {
    expect(updateMockedEntityService).toBeDefined();
  });

  describe('execute()', () => {
    it("should reject if entities doesn't exists", async () => {
      const entity = generateMockedEntityDto({ id: 'random_id' });
      await expect(
        updateMockedEntityService.execute(entity.id, entity, correlationId),
      ).rejects.toThrow(
        `${repository.entityName} not found with id: ${entity.id}`,
      );
    });

    it('should resolve the updated MockedEntity', async () => {
      const dto = generateMockedEntityDto();
      const entity = await createMockedEntityService.execute(
        dto,
        correlationId,
      );

      const result = await updateMockedEntityService.execute(
        entity.id,
        dto,
        correlationId,
      );

      expect(result).toEqual({ ...entity, updatedAt: result.updatedAt });
    });
  });
});
