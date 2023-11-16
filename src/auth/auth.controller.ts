import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SignInService } from './services/sign-in.service';
import { SignInDto } from './dto/sign-in.dto';
import { CustomRequest } from '../common';
import { ForgotPasswordService } from './services/forgot-password.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { AuthGuard } from '../common/auth';
import { RefreshTokenService } from './services/refresh-token.service';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInService: SignInService,
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Post()
  signIn(
    @Req() request: CustomRequest,
    @Body() signInDto: SignInDto,
    @I18n() i18n: I18nContext,
  ) {
    return this.signInService.execute(signInDto, request.correlationId, i18n);
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard)
  async refreshToken(@Req() request: CustomRequest) {
    return this.refreshTokenService.execute(
      request.headers['authorization'] as string,
      request.correlationId,
    );
  }

  @Post('forgot-password')
  async forgotPassword(
    @Req() request: CustomRequest,
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ) {
    return this.forgotPasswordService.execute(
      forgotPasswordDto,
      request.correlationId,
    );
  }
}
