import { MockedEntitiesRepository } from '../repositories/mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { generateMockedEntityDto } from '../entities/mocks';
import { CountMockedEntitiesService, CreateMockedEntityService } from './mocks';
import { ZeownaLoggerModule } from '../logger';

describe('AbstractCountEntitiesService', () => {
  const correlationId = 'any_string';

  let countMockedEntitiesService: CountMockedEntitiesService;
  let createMockedEntityService: CreateMockedEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ZeownaLoggerModule.register()],
      providers: [
        CreateMockedEntityService,
        CountMockedEntitiesService,
        MockedEntitiesRepository,
      ],
    }).compile();

    countMockedEntitiesService = module.get<CountMockedEntitiesService>(
      CountMockedEntitiesService,
    );
    createMockedEntityService = module.get<CreateMockedEntityService>(
      CreateMockedEntityService,
    );
  });

  it('should exist', () => {
    expect(countMockedEntitiesService).toBeDefined();
  });

  describe('execute', () => {
    it('should resolve 0 if no entity was found', async () => {
      const expected = 0;

      const result = await countMockedEntitiesService.execute(
        {},
        correlationId,
      );

      expect(result).toEqual(expected);
    });
  });

  it('should resolve the total of entities', async () => {
    const expected = 10;
    await Promise.all(
      Array(expected)
        .fill(null)
        .map(async () =>
          createMockedEntityService.execute(
            generateMockedEntityDto(),
            correlationId,
          ),
        ),
    );

    const result = await countMockedEntitiesService.execute({}, correlationId);

    expect(result).toEqual(expected);
  });
});
