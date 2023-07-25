import { Request } from 'express';
import { ID } from '../entities';

export interface DecodedJwt {
  sub: ID;
  username: string;
  exp?: number;
}

export interface CustomRequest extends Request {
  user: DecodedJwt;
  correlationId: string;
}
