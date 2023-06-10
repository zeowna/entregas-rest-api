import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@Injectable()
@ValidatorConstraint({ name: 'isUserCpfAlreadyInUse', async: true })
export class IsUserCpfAlreadyInUse implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(cpf: string) {
    try {
      const exists = await this.usersService.findByCpf(cpf);
      return !exists;
    } catch (err) {
      if (err instanceof NotFoundException) {
        return false;
      }

      throw err;
    }
  }

  defaultMessage() {
    return 'User already exist with cpf: $value';
  }
}
