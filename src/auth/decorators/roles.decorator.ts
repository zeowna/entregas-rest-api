import { Reflector } from '@nestjs/core';
import { UserTypes } from '../../users/entities/user-types.enum';

export const Roles = Reflector.createDecorator<UserTypes[]>();
