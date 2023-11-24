import { QueryRunner } from 'typeorm';
import { DatabaseTransactionRunnerInterface } from './database-transaction-runner.interface';

export class TypeORMTransactionRunner
  implements DatabaseTransactionRunnerInterface
{
  constructor(private readonly queryRunner: QueryRunner) {}

  async start() {
    await this.runner.startTransaction();
  }

  async commit() {
    await this.runner.commitTransaction();
  }

  async rollback() {
    await this.runner.rollbackTransaction();
  }

  async release() {
    await this.runner.release();
  }

  get runner() {
    return this.queryRunner;
  }
}
