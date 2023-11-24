import { DatabaseTransactionFactory } from './database-transaction-factory.interface';
import { TypeORMTransactionRunner } from './typeorm-transaction-runner';
import { DataSource } from 'typeorm';

export class AbstractTypeORMTransactionFactory
  implements DatabaseTransactionFactory<TypeORMTransactionRunner>
{
  constructor(protected readonly dataSource: DataSource) {}

  async getRunner() {
    await this.dataSource.initialize();
    return new TypeORMTransactionRunner(this.dataSource.createQueryRunner());
  }
}
