import { CreateUserDto } from './create-user.dto';

export class CreateAdminDto extends CreateUserDto {
  toEntity() {
    return super.toEntity();
  }
}
