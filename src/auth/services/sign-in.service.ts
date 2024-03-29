import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AbstractSignInService, NestJwtService } from '../../common/auth';
import { BcryptHashService } from '../../hash/services/bcrypt-hash.service';
import { DecodedJwt, NestLoggerService } from '../../common';
import { SignInDto } from '../dto/sign-in.dto';
import { SignInResponse } from '../responses/sign-in.response';
import { FindUserByEmailService } from '../../users/services/find-user-by-email.service';
import { I18nContext } from 'nestjs-i18n';
import { PartnerUser } from '../../users/entities/partner-user.entity';
import { readFile } from 'fs/promises';

@Injectable()
export class SignInService extends AbstractSignInService {
  constructor(
    private readonly findUserByEmailService: FindUserByEmailService,
    private readonly jwtService: NestJwtService,
    private readonly hashService: BcryptHashService,
    private readonly logger: NestLoggerService,
  ) {
    super(jwtService, logger);
  }

  async execute(
    signInDto: SignInDto,
    correlationId: string,
    i18n: I18nContext,
  ) {
    const { email, password } = signInDto;

    this.logBefore({
      email,
      password,
      correlationId,
    });
    const user = await this.findUserByEmailService.execute(
      email,
      correlationId,
    );

    if (!user) {
      throw new NotFoundException(i18n.translate('validation.Auth.notFound'));
    }

    const isEqual = await this.hashService.comparePasswords(
      user.password,
      password,
    );

    if (!isEqual) {
      this.logAfter({ success: false, isEqual, correlationId });
      throw new UnauthorizedException(
        i18n.translate('validation.Auth.password'),
      );
    }

    const payload = {
      sub: user.id,
      username: user.email,
      userType: user.type,
      partnerId: (user as PartnerUser)?.partner?.id,
    } as DecodedJwt;

    const signed = await this.signPayload(
      payload,
      await readFile(`${process.cwd()}/keys/rsa.key`),
    );

    const response = new SignInResponse({
      user: user.present(),
      authorization_token: signed,
    });

    this.logAfter({ success: true, correlationId });

    return response;
  }
}
