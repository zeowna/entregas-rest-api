import { CreateUserDto } from './create-user.dto';
import { AdminUser } from '../entities/admin-user.entity';
import { UserTypes } from '../entities/user-types.enum';

export class CreateAdminUserDto extends CreateUserDto {
  toEntity() {
    return new AdminUser({
      name: this.name,
      birthday: this.birthday,
      cpf: this.cpf,
      email: this.email,
      password: this.password,
      type: UserTypes.Admin,
    });
  }
}
