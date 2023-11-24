export interface DatabaseTransactionFactory<T> {
  getRunner(): Promise<T>;
}
