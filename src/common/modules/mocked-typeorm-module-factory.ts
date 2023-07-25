import { MockedTypeORMModuleWithPgMem } from './mocked-typeorm-module-pg-mem';

export class MockedTypeORMModuleFactory {
  static usePgMem() {
    return new MockedTypeORMModuleWithPgMem();
  }
}
