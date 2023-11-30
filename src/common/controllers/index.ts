import { Request } from 'express';
import { ID } from '../entities';
import { UserTypes } from '../../users/entities/user-types.enum';

export interface DecodedJwt {
  sub: ID;
  username: string;
  exp?: number;
  userType: UserTypes;
  partnerId: ID;
}

export interface CustomRequest extends Request {
  user: DecodedJwt;
  correlationId: string;
}
