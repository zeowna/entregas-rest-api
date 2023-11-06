import { CreateUserDto } from '../../users/dto/create-user.dto';
import { AdminUser } from '../../users/entities/admin-user.entity';

export class CreateAdminUserDto extends CreateUserDto {
  toEntity() {
    return new AdminUser({
      name: this.name,
      birthday: this.birthday,
      cpf: this.cpf,
      email: this.email,
      password: this.password,
    });
  }
}
