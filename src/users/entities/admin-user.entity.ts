import { User } from './user.entity';
import { ChildEntity } from 'typeorm';
import { UserTypes } from './user-types.enum';
import { AdminUserResponse } from '../responses/admin.response';

@ChildEntity(UserTypes.Admin)
export class AdminUser extends User {
  type = UserTypes.Admin;

  present() {
    return new AdminUserResponse(this);
  }
}
