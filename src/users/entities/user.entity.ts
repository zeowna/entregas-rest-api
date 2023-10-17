import { Column, Entity, TableInheritance } from 'typeorm';
import { AbstractTypeORMEntity, ExcludeMethods } from '../../common';
import { UserTypes } from './user-types.enum';
import { UserResponse } from '../responses/user.response';

@Entity()
@TableInheritance({ column: { type: String, name: 'type' } })
export class User extends AbstractTypeORMEntity {
  @Column()
  name: string;

  @Column()
  birthday: Date;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profilePictureURI?: string;

  @Column()
  readonly type: UserTypes;

  constructor(props: ExcludeMethods<User>) {
    super(props);
    this.name = props?.name;
    this.birthday = props?.birthday;
    this.cpf = props?.cpf;
    this.email = props?.email;
    this.password = props?.password;
    this.profilePictureURI = props?.profilePictureURI;
    this.type = props?.type;
  }

  present() {
    return new UserResponse(this);
  }
}
