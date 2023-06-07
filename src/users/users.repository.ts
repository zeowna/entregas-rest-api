import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AbstractTypeORMRepository } from '../common/repository/abstract-typeorm.repository';

@Injectable()
export class UsersRepository extends AbstractTypeORMRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByCpf(cpf: string) {
    return this.usersRepository.findOne({ where: { cpf } });
  }
}
