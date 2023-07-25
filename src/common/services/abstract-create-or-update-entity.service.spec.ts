import { MockedEntitiesRepository } from '../repositories/mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrUpdateMockedEntityService } from './mocks';
import { generateMockedEntityDto } from '../entities/mocks';
import { ZeownaLoggerModule } from '../logger';

describe('AbstractCreateOrUpdateEntityService', () => {
  const correlationId = 'any_string';

  let createOrUpdateMockedEntityService: CreateOrUpdateMockedEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ZeownaLoggerModule.register()],
      providers: [CreateOrUpdateMockedEntityService, MockedEntitiesRepository],
    }).compile();

    createOrUpdateMockedEntityService =
      module.get<CreateOrUpdateMockedEntityService>(
        CreateOrUpdateMockedEntityService,
      );
  });

  it('should be defined', () => {
    expect(createOrUpdateMockedEntityService).toBeDefined();
  });

  describe('execute()', () => {
    it('should resolve a created MockedEntity', async () => {
      const dto = generateMockedEntityDto();
      const entity = dto.toEntity();

      const result = await createOrUpdateMockedEntityService.execute(
        dto,
        correlationId,
      );

      expect(result).toEqual({
        ...entity,
        id: result.id,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      });
    });
  });
});
