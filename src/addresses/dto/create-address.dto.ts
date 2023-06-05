import { IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  cep: string;

  @IsString()
  street: string;

  @IsString()
  neighbourhood: string;

  @IsString()
  number: number;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}
