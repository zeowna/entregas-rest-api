import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashService } from '../../common/service/hash-service.interface';

@Injectable()
export class BcryptHashService implements HashService {
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(userPassword: string, storedPassword: string) {
    return await bcrypt.compare(userPassword, storedPassword);
  }
}
