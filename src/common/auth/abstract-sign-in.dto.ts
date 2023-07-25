export abstract class AbstractSignInDto {
  email: string;
  password: string;

  constructor(props: AbstractSignInDto) {
    this.email = props?.email;
    this.password = props?.password;
  }
}
