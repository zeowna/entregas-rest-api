import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AbstractTypeORMRepository } from '../../common';
import { InjectRepository } from '@nestjs/typeorm';

export class UsersTypeORMRepository<
  T extends User = User,
> extends AbstractTypeORMRepository<T> {
  constructor(
    @InjectRepository(User) protected readonly usersRepository: Repository<T>,
  ) {
    super(usersRepository);
  }

  async findByEmail(email: string) {
    return (this.usersRepository as Repository<User>).findOneBy({
      email,
    });
  }

  async findByCpf(cpf: string) {
    return (this.usersRepository as Repository<User>).findOneBy({
      cpf,
    });
  }
}
