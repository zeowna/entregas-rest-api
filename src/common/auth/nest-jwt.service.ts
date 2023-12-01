import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtServiceInterface } from './jwt-service.interface';

@Injectable()
export class NestJwtService implements JwtServiceInterface {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: Record<string, any>, privateKey: Buffer) {
    return this.jwtService.signAsync(payload, {
      privateKey,
      algorithm: 'RS256',
    });
  }

  async verify<T>(token: string, publicKey: Buffer) {
    const decoded = await this.jwtService.verifyAsync(token, {
      publicKey,
      algorithms: ['RS256'],
    });

    return decoded as T;
  }
}
