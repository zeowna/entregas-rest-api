import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { AbstractService } from '../common/service/abstract-service.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BcryptHashService } from './hash/bcrypt-hash.service';

@Injectable()
export class UsersService extends AbstractService<User> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: BcryptHashService,
  ) {
    super(usersRepository);
  }

  async updatePassword(user: User, password: string) {
    user.password = await this.hashService.hashPassword(password);
    return super.update(user.id, user);
  }

  async create(createUserDto: CreateUserDto) {
    const created = await super.create(createUserDto);
    return this.updatePassword(
      created,
      await this.hashService.hashPassword(created.password),
    );
  }

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }
}
