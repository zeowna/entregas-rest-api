import { AbstractMockedRepository } from '../../common';
import { User } from '../entities/user.entity';
import { CustomerUser } from '../entities/customer-user.entity';

export class UsersRepositoryMock extends AbstractMockedRepository<User> {
  constructor() {
    super(CustomerUser);
  }

  async findByCpf(cpf: string) {
    const found = this.data.find(({ cpf: userCpf }) => cpf === userCpf);

    if (!found) {
      return null;
    }

    return found;
  }

  async findByEmail(email: string) {
    const found = this.data.find(({ email: userEmail }) => email === userEmail);

    if (!found) {
      return null;
    }

    return found;
  }
}
