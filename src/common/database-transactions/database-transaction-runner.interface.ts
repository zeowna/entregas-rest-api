export interface DatabaseTransactionRunnerInterface {
  start(): Promise<void>;

  commit(): Promise<void>;

  rollback(): Promise<void>;
}
