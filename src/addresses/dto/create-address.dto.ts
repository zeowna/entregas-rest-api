import { IsOptional, IsString } from 'class-validator';
import { AbstractDto } from '../../common';
import { Address } from '../entities/address.entity';

export class CreateAddressDto extends AbstractDto<Address> {
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
