import { AbstractSignInResponse } from '../../common/auth';
import { UserResponse } from '../../users/responses/user.response';

export class SignInResponse extends AbstractSignInResponse {
  user: UserResponse;
  authorization_token: string;

  constructor(props: SignInResponse) {
    super(props);
    this.user = props.user;
  }
}
