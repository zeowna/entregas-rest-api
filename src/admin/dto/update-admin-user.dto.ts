import { CreateAdminUserDto } from './create-admin-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateAdminUserDto extends CreateAdminUserDto {
  @IsOptional()
  password: string;
}
