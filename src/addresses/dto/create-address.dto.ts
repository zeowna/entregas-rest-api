import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { AbstractEntityDto } from '../../common';
import { Address } from '../entities/address.entity';

export class CreateAddressDto extends AbstractEntityDto<Address> {
  @IsDefined()
  @IsString()
  cep: string;

  @IsDefined()
  @IsString()
  street: string;

  @IsDefined()
  @IsString()
  neighbourhood: string;

  @IsDefined()
  @IsNumber()
  number: number;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsDefined()
  @IsString()
  city: string;

  @IsDefined()
  @IsString()
  state: string;

  toEntity() {
    return new Address({
      cep: this.cep,
      street: this.street,
      neighbourhood: this.neighbourhood,
      number: this.number,
      complement: this.complement,
      city: this.city,
      state: this.state,
    });
  }
}
