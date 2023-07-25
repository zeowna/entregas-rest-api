import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AbstractSignInService, NestJwtService } from '../../common/auth';
import { BcryptHashService } from '../../hash/services/bcrypt-hash.service';
import { DecodedJwt, NestLoggerService } from '../../common';
import { SignInDto } from '../dto/sign-in.dto';
import { jwtConstants } from '../../common/auth/constants';
import { SignInResponse } from '../sign-in.response';
import { FindUserByEmailService } from '../../users/services/find-user-by-email.service';

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

  async execute(signInDto: SignInDto, correlationId: string) {
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
      throw new NotFoundException('User not found');
    }

    const isEqual = await this.hashService.comparePasswords(
      user.password,
      password,
    );

    if (!isEqual) {
      this.logAfter({ success: false, isEqual, correlationId });
      throw new UnauthorizedException("User password doesn't match");
    }

    const payload = {
      sub: user.id,
      username: user.email,
    } as DecodedJwt;

    const signed = await this.signPayload(payload, jwtConstants.secret);

    const response = new SignInResponse({ authorization_token: signed });

    this.logAfter({ success: true, correlationId });

    return response;
  }
}
