import { MockedEntitiesRepository } from '../repositories/mocks';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CountMockedEntitiesService,
  CreateMockedEntityService,
  FindMockedEntitiesService,
} from './mocks';
import { generateMockedEntityDto, MockedEntity } from '../entities/mocks';
import { ZeownaLoggerModule } from '../logger';
import { MockedEntityPagingDto } from '../entities/mocks/mocked-entity-paging.dto';
import { SortParams } from '../repositories';

describe('AbstractFindEntitiesService', () => {
  const correlationId = 'any_string';

  let findMockedEntitiesService: FindMockedEntitiesService;
  let createMockedEntityService: CreateMockedEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ZeownaLoggerModule.register()],
      providers: [
        CountMockedEntitiesService,
        FindMockedEntitiesService,
        CreateMockedEntityService,
        MockedEntitiesRepository,
      ],
    }).compile();

    findMockedEntitiesService = module.get<FindMockedEntitiesService>(
      FindMockedEntitiesService,
    );
    createMockedEntityService = module.get<CreateMockedEntityService>(
      CreateMockedEntityService,
    );
  });

  it('should be defined', () => {
    expect(findMockedEntitiesService).toBeDefined();
  });

  describe('execute()', () => {
    const pagingDto = new MockedEntityPagingDto({
      skip: String(0),
      limit: String(10),
      sort: JSON.stringify({ createdAt: -1 } as SortParams<MockedEntity>),
    });

    it('should resolve [] if any results were found', async () => {
      const result = await findMockedEntitiesService.execute(
        pagingDto,
        correlationId,
      );
      const expected = [];

      await expect(result.list).toEqual(expected);
    });

    it('should resolve MockedEntity[]', async () => {
      const expected = await Promise.all(
        Array(10)
          .fill(null)
          .map(async () =>
            createMockedEntityService.execute(
              generateMockedEntityDto(),
              correlationId,
            ),
          ),
      );

      const result = await findMockedEntitiesService.execute(
        pagingDto,
        correlationId,
      );

      expect(result.list).toEqual(expected);
    });
  });
});
