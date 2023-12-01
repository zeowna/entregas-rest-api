import { Injectable } from '@nestjs/common';
import { AbstractService } from '../services';
import { AbstractSignInResponse } from './abstract-sign-in.response';
import { JwtServiceInterface } from './jwt-service.interface';
import { AbstractSignInDto } from './abstract-sign-in.dto';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export abstract class AbstractSignInService extends AbstractService<AbstractSignInResponse> {
  constructor(
    private readonly jwtServiceImpl: JwtServiceInterface,
    private readonly loggerImpl,
  ) {
    super(loggerImpl);
  }

  protected async signPayload(
    payload: Record<string, any>,
    privateKey: Buffer,
  ) {
    return this.jwtServiceImpl.sign(payload, privateKey);
  }

  abstract execute(
    signInDto: AbstractSignInDto,
    correlationId: string,
    i18n?: I18nContext,
  ): Promise<AbstractSignInResponse>;
}
