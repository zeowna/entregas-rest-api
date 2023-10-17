import { Injectable } from '@nestjs/common';
import { AbstractService } from '../services';
import { AbstractSignInResponse } from './abstract-sign-in.response';
import { JwtServiceInterface } from './jwt-service.interface';
import { AbstractSignInDto } from './abstract-sign-in.dto';

@Injectable()
export abstract class AbstractSignInService extends AbstractService<AbstractSignInResponse> {
  constructor(
    private readonly jwtServiceImpl: JwtServiceInterface,
    private readonly loggerImpl,
  ) {
    super(loggerImpl);
  }

  protected async signPayload(payload: Record<string, any>, secret: string) {
    return this.jwtServiceImpl.sign(payload, secret);
  }

  abstract execute(
    signInDto: AbstractSignInDto,
    correlationId: string,
  ): Promise<AbstractSignInResponse>;
}