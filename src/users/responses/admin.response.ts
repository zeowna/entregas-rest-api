import { UserResponse } from './user.response';
import { AdminUser } from '../entities/admin-user.entity';

export class AdminResponse extends UserResponse {
  constructor(props: AdminUser) {
    super(props);
  }
}
