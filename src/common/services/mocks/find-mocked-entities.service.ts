import { Injectable } from '@nestjs/common';
import { MockedEntity } from '../../entities/mocks';
import { MockedEntitiesRepository } from '../../repositories/mocks';
import { NestLoggerService } from '../../logger';
import { AbstractFindEntitiesService } from '../abstract-find-entities.service';
import { CountMockedEntitiesService } from './count-mocked-entities.service';
import { AbstractFindEntitiesResponse } from '../abstract-find-entities.response';

export class FindMockedEntitiesResponse extends AbstractFindEntitiesResponse<MockedEntity> {}

@Injectable()
export class FindMockedEntitiesService extends AbstractFindEntitiesService<
  MockedEntity,
  FindMockedEntitiesResponse
> {
  constructor(
    private readonly mockedEntitiesRepository: MockedEntitiesRepository,
    private readonly countMockedEntitiesService: CountMockedEntitiesService,
    private readonly logger: NestLoggerService,
  ) {
    super(
      mockedEntitiesRepository,
      countMockedEntitiesService,
      logger,
      FindMockedEntitiesResponse,
    );
  }
}
