import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntityPresenter } from '../../common';
import { UserTypes } from '../entities/user-types.enum';
import { User } from '../entities/user.entity';

export class UserResponse extends AbstractEntityPresenter<User> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  profilePictureURI: string;

  @ApiProperty({ type: () => UserTypes, enum: Object.values(UserTypes) })
  type: UserTypes;

  constructor(props: User) {
    super(props);
    this.name = props?.name;
    this.birthday = props?.birthday;
    this.cpf = props?.cpf;
    this.email = props?.email;
    this.profilePictureURI = props?.profilePictureURI;
    this.type = props?.type;
  }
}
