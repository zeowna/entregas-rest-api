import { Injectable } from '@nestjs/common';
import { MockedEntity } from '../../entities/mocks';
import { MockedEntitiesRepository } from '../../repositories/mocks';
import { NestLoggerService } from '../../logger';
import { AbstractCreateOrUpdateEntityService } from '../abstract-create-or-update-entity.service';

@Injectable()
export class CreateOrUpdateMockedEntityService extends AbstractCreateOrUpdateEntityService<MockedEntity> {
  constructor(
    private readonly mockedEntitiesRepository: MockedEntitiesRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(mockedEntitiesRepository, logger);
  }
}
