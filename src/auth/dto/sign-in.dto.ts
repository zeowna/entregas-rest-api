import { IsDefined, IsString } from 'class-validator';
import { AbstractSignInDto } from '../../common/auth';

export class SignInDto extends AbstractSignInDto {
  @IsDefined()
  @IsString()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}
