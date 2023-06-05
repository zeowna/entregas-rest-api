import { IsDefined, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';

export class CreatePartnerDto {
  @IsString()
  name: string;

  @IsString()
  cnpj: string;

  @IsString()
  @IsOptional()
  pictureURI?: string;

  @IsDefined()
  address: CreateAddressDto;
}
