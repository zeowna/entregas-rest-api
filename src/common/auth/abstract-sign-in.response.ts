export abstract class AbstractSignInResponse {
  authorization_token: string;

  constructor(props: AbstractSignInResponse) {
    this.authorization_token = props.authorization_token;
  }
}
