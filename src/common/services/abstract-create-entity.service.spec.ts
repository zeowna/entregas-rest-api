import { MockedEntitiesRepository } from '../repositories/mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateMockedEntityService } from './mocks';
import { generateMockedEntityDto } from '../entities/mocks';
import { ZeownaLoggerModule } from '../logger';

describe('AbstractCreateEntityService', () => {
  const correlationId = 'any_string';

  let createMockedEntityService: CreateMockedEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ZeownaLoggerModule.register()],
      providers: [CreateMockedEntityService, MockedEntitiesRepository],
    }).compile();

    createMockedEntityService = module.get<CreateMockedEntityService>(
      CreateMockedEntityService,
    );
  });

  it('should be defined', () => {
    expect(createMockedEntityService).toBeDefined();
  });

  describe('execute()', () => {
    it('should resolve the created MockedEntity', async () => {
      const dto = generateMockedEntityDto();
      const result = await createMockedEntityService.execute(
        dto,
        correlationId,
      );

      expect(result).toEqual({
        ...dto.toEntity(),
        id: result.id,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      });
    });
  });
});
