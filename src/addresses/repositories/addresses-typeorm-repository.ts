import { Injectable } from '@nestjs/common';
import { AbstractTypeORMRepository } from '../../common';
import { Address } from '../entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AddressesTypeORMRepository extends AbstractTypeORMRepository<Address> {
  constructor(
    @InjectRepository(Address)
    private readonly addressesRepository: Repository<Address>,
  ) {
    super(addressesRepository);
  }
}
