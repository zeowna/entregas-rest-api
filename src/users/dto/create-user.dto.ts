import {
  IsDefined,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserTypes } from '../entities/user-types.enum';
import { Address } from '../../addresses/entities/address.entity';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  birthday: Date;

  @IsDefined()
  @IsString()
  cpf: string;

  @IsDefined()
  @IsString()
  email: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  profilePictureURI?: string;

  @IsDefined()
  @IsString()
  type: UserTypes;

  @IsOptional()
  @IsString()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses?: Address[];
}
