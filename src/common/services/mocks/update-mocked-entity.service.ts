import { Injectable } from '@nestjs/common';
import { MockedEntity } from '../../entities/mocks';
import { MockedEntitiesRepository } from '../../repositories/mocks';
import { NestLoggerService } from '../../logger';
import { FindMockedEntityByIdService } from './find-mocked-entity-by-id.service';
import { AbstractUpdateEntityService } from '../abstract-update-entity.service';

@Injectable()
export class UpdateMockedEntityService extends AbstractUpdateEntityService<MockedEntity> {
  constructor(
    private readonly mockedEntitiesRepository: MockedEntitiesRepository,
    private readonly findMockedEntityByIdService: FindMockedEntityByIdService,
    private readonly logger: NestLoggerService,
  ) {
    super(mockedEntitiesRepository, findMockedEntityByIdService, logger);
  }
}
