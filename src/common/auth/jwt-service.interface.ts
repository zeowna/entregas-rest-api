export interface JwtServiceInterface {
  sign(payload: Record<string, any>, privateKey: Buffer): Promise<string>;

  verify<T>(token: string, publicKey: Buffer): Promise<T>;
}
