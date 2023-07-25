import { Injectable } from '@nestjs/common';
import { AbstractCreateEntityService } from '../abstract-create-entity.service';
import { MockedEntity } from '../../entities/mocks';
import { MockedEntitiesRepository } from '../../repositories/mocks';
import { NestLoggerService } from '../../logger';

@Injectable()
export class CreateMockedEntityService extends AbstractCreateEntityService<MockedEntity> {
  constructor(
    private readonly mockedEntitiesRepository: MockedEntitiesRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(mockedEntitiesRepository, logger);
  }
}
