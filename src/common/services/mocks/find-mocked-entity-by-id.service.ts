import { Injectable } from '@nestjs/common';
import { AbstractFindEntityByIdService } from '../abstract-find-entity-by-id.service';
import { MockedEntity } from '../../entities/mocks';
import { MockedEntitiesRepository } from '../../repositories/mocks';
import { NestLoggerService } from '../../logger';

@Injectable()
export class FindMockedEntityByIdService extends AbstractFindEntityByIdService<MockedEntity> {
  constructor(
    private readonly mockedEntitiesRepository: MockedEntitiesRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(mockedEntitiesRepository, logger);
  }
}
