import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptHashService } from '../users/hash/bcrypt-hash.service';
import { jwtConstants } from './constants';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: BcryptHashService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string, i18n: I18nContext) {
    this.usersService.setI18n(i18n);
    const user = await this.usersService.findByEmail(email);

    const isEqual = await this.hashService.comparePasswords(
      user.password,
      password,
    );

    if (isEqual) {
      throw new UnauthorizedException(i18n.t('validation.auth.password'));
    }

    const signed = await this.jwtService.signAsync(
      {
        sub: user.id,
        username: user.email,
      },
      { secret: jwtConstants.secret },
    );

    return {
      authorization_token: signed,
    };
  }
}
