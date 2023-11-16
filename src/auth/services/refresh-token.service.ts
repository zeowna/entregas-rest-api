import { Injectable } from '@nestjs/common';
import { AbstractService, DecodedJwt, NestLoggerService } from '../../common';
import { SignInResponse } from '../responses/sign-in.response';
import { jwtConstants } from '../../common/auth/constants';
import { FindUserByIdService } from '../../users/services/find-user-by-id.service';
import { NestJwtService } from '../../common/auth';

@Injectable()
export class RefreshTokenService extends AbstractService<SignInResponse> {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly logger: NestLoggerService,
    private readonly findUserByIdService: FindUserByIdService,
  ) {
    super(logger);
  }

  private async signPayload(payload: Record<string, any>, secret: string) {
    return this.jwtService.sign(payload, secret);
  }

  async execute(token: string, correlationId: string) {
    const decoded: DecodedJwt = await this.jwtService.verify(
      token.split('Bearer ')[1],
      jwtConstants.secret,
    );

    const user = await this.findUserByIdService.execute(
      decoded.sub,
      correlationId,
    );

    const payload = {
      sub: user.id,
      username: user.email,
    } as DecodedJwt;

    const signed = await this.signPayload(payload, jwtConstants.secret);

    const response = new SignInResponse({
      user: user.present(),
      authorization_token: signed,
    });

    return response;
  }
}
