export interface ServiceInterface<R> {
  execute(...args: any[]): R | Promise<R>;
}
