import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtServiceInterface } from './jwt-service.interface';

@Injectable()
export class NestJwtService implements JwtServiceInterface {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: Record<string, any>, secret: string) {
    return this.jwtService.signAsync(payload, { secret });
  }

  async verify<T>(token: string, secret: string) {
    const decoded = await this.jwtService.verify(token, { secret });

    return decoded as T;
  }
}
