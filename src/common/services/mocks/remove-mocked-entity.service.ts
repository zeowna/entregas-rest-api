import { Injectable } from '@nestjs/common';
import { AbstractRemoveEntityService } from '../abstract-remove-entity.service';
import { MockedEntity } from '../../entities/mocks';
import { MockedEntitiesRepository } from '../../repositories/mocks';
import { NestLoggerService } from '../../logger';
import { FindMockedEntityByIdService } from './find-mocked-entity-by-id.service';

@Injectable()
export class RemoveMockedEntityService extends AbstractRemoveEntityService<MockedEntity> {
  constructor(
    private readonly mockedEntitiesRepository: MockedEntitiesRepository,
    private readonly findMockedEntityByIdService: FindMockedEntityByIdService,
    private readonly logger: NestLoggerService,
  ) {
    super(mockedEntitiesRepository, findMockedEntityByIdService, logger);
  }
}
