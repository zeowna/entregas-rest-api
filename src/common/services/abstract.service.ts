import { ServiceInterface } from './service.interface';
import { LoggerInterface } from '../logger';

export abstract class AbstractService<R> implements ServiceInterface<R> {
  constructor(protected readonly loggerImp: LoggerInterface) {}

  protected logBefore(...args: any[]) {
    this.loggerImp.info(`${this.logLabel} before`, ...args);
  }

  protected logAfter(...args: any[]) {
    this.loggerImp.info(`${this.logLabel} after`, ...args);
  }

  abstract execute(...args): R | Promise<R>;

  get logLabel() {
    return `${this.constructor.name}.execute()`;
  }
}
