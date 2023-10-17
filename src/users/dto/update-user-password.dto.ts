import { AbstractEntityDto } from '../../common';
import { IsDefined, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateUserPasswordDto extends AbstractEntityDto<User> {
  @IsString()
  @IsDefined()
  password: string;

  toEntity() {
    return new User({ password: this.password });
  }
}
