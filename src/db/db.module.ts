import { Global, Module } from '@nestjs/common';
import { TypeORMTransactionFactory } from './transaction/typeorm-transaction.factory';

@Global()
@Module({
  providers: [TypeORMTransactionFactory],
  exports: [TypeORMTransactionFactory],
})
export class DbModule {}
