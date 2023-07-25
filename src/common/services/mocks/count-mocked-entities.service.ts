import { Injectable } from '@nestjs/common';
import { MockedEntity } from '../../entities/mocks';
import { MockedEntitiesRepository } from '../../repositories/mocks';
import { NestLoggerService } from '../../logger';
import { AbstractCountEntitiesService } from '../abstract-count-entities.service';

@Injectable()
export class CountMockedEntitiesService extends AbstractCountEntitiesService<MockedEntity> {
  constructor(
    private readonly mockedEntitiesRepository: MockedEntitiesRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(mockedEntitiesRepository, logger);
  }
}
