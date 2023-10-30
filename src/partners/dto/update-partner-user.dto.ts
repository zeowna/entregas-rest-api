import { CreatePartnerUserDto } from './create-partner-user.dto';
import { IsOptional } from 'class-validator';

export class UpdatePartnerUserDto extends CreatePartnerUserDto {
  @IsOptional()
  password: string;
}
