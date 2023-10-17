export interface JwtServiceInterface {
  sign(payload: Record<string, any>, secret: string): Promise<string>;

  verify<T>(token: string, secret: string): Promise<T>;
}
