import { User } from './user.entity';
import { ChildEntity } from 'typeorm';
import { UserTypes } from './user-types.enum';
import { AdminResponse } from '../responses/admin.response';

@ChildEntity(UserTypes.Admin)
export class AdminUser extends User {
  present() {
    return new AdminResponse(this);
  }
}
