import { Injectable } from '@nestjs/common';
import { AbstractService, DecodedJwt, NestLoggerService } from '../../common';
import { SignInResponse } from '../responses/sign-in.response';
import { FindUserByIdService } from '../../users/services/find-user-by-id.service';
import { NestJwtService } from '../../common/auth';
import { PartnerUser } from '../../users/entities/partner-user.entity';
import { readFile } from 'fs/promises';

@Injectable()
export class RefreshTokenService extends AbstractService<SignInResponse> {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly logger: NestLoggerService,
    private readonly findUserByIdService: FindUserByIdService,
  ) {
    super(logger);
  }

  private async signPayload(payload: Record<string, any>) {
    return this.jwtService.sign(
      payload,
      await readFile(`${process.cwd()}/keys/rsa.key`),
    );
  }

  async execute(token: string, correlationId: string) {
    const decoded: DecodedJwt = await this.jwtService.verify(
      token.split('Bearer ')[1],
      await readFile(`${process.cwd()}/keys/rsa.key.pub`),
    );

    const user = await this.findUserByIdService.execute(
      decoded.sub,
      correlationId,
    );

    const payload = {
      sub: user.id,
      username: user.email,
      userType: user.type,
      partnerId: (user as PartnerUser)?.partner?.id,
    } as DecodedJwt;

    const signed = await this.signPayload(payload);

    const response = new SignInResponse({
      user: user.present(),
      authorization_token: signed,
    });

    return response;
  }
}
