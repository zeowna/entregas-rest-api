import { AbstractSignInResponse } from '../common/auth';

export class SignInResponse extends AbstractSignInResponse {
  authorization_token: string;
}
