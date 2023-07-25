import { AbstractTypeORMRepository } from '../abstract-typeorm.repository';
import { MockedTypeORMEntity } from '../../entities/mocks';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class MockedEntitiesTypeORMRepository extends AbstractTypeORMRepository<MockedTypeORMEntity> {
  constructor(
    @InjectRepository(MockedTypeORMEntity)
    mockedTypeORMEntitiesRepository: Repository<MockedTypeORMEntity>,
  ) {
    super(mockedTypeORMEntitiesRepository);
  }
}
