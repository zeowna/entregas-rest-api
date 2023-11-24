import { Injectable } from '@nestjs/common';
import {
  AbstractTypeORMTransactionFactory,
  TypeORMTransactionRunner,
} from '../../common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class TypeORMTransactionFactory extends AbstractTypeORMTransactionFactory {
  constructor(
    @InjectDataSource()
    dataSource: DataSource,
  ) {
    super(dataSource);
  }

  async getRunner() {
    return new TypeORMTransactionRunner(this.dataSource.createQueryRunner());
  }
}
