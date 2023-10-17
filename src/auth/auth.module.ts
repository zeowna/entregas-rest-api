import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignInService } from './services/sign-in.service';
import { ZeownaAuthModule } from '../common/auth';
import { jwtConstants } from '../common/auth/constants';
import { UsersHttpModule } from '../users/users-http.module';
import { HashModule } from '../hash/hash.module';
import { ForgotPasswordService } from './services/forgot-password.service';
import { RefreshTokenService } from './services/refresh-token.service';

@Module({
  imports: [
    UsersHttpModule,
    HashModule,
    ZeownaAuthModule.register({
      global: true,
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [SignInService, ForgotPasswordService, RefreshTokenService],
})
export class AuthModule {}
