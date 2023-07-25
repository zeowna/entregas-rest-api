export interface JwtServiceInterface {
  sign(payload: Record<string, any>, secret: string): Promise<string>;
}
