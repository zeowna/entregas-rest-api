import { Injectable } from '@nestjs/common';
import { AbstractTypeORMRepository } from '../common/repository/abstract-typeorm.repository';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AddressesRepository extends AbstractTypeORMRepository<Address> {
  constructor(
    @InjectRepository(Address)
    private readonly addressesRepository: Repository<Address>,
  ) {
    super(addressesRepository);
  }
}
