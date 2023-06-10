import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  signIn(@Body() signInDto: SignInDto, @I18n() i18n: I18nContext) {
    return this.authService.signIn(signInDto.email, signInDto.password, i18n);
  }
}
