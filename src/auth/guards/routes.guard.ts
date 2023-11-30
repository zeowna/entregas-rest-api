import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserTypes } from '../../users/entities/user-types.enum';
import { Roles } from '../decorators/roles.decorator';
import { DecodedJwt } from '../../common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: UserTypes[], userType: UserTypes) {
    return roles.some((role) => role === userType);
  }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: DecodedJwt = request.user;

    return this.matchRoles(roles, user.userType);
  }
}
