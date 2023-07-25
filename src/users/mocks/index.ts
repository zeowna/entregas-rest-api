import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ExcludeMethods } from '../../common';
import { UserTypes } from '../entities/user-types.enum';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerUser } from '../entities/customer-user.entity';

export const assertUser = (
  received: User,
  expected: User,
  isUpdate = false,
) => {
  expect(received.id).toEqual(expected.id);
  expect(received.email).toEqual(expected.email);
  expect(received.createdAt.toISOString()).toEqual(
    expected.createdAt.toISOString(),
  );
  if (!isUpdate) {
    expect(received.updatedAt.toISOString()).toEqual(
      expected.updatedAt.toISOString(),
    );
  }
};

export const generateCustomerDto = (
  props: ExcludeMethods<CreateUserDto> = {},
) =>
  new CreateCustomerDto({
    name: 'any_string',
    birthday: new Date(),
    cpf: 'any_string',
    email: 'any@email.com',
    password: 'any_string',
    addresses: [],
    type: UserTypes.Admin,
    ...props,
  });

export const generateCustomer = (props: Partial<CustomerUser> = {}) =>
  new CustomerUser({
    name: 'any_string',
    birthday: new Date(),
    cpf: 'any_string',
    email: 'any@email.com',
    password: 'any_string',
    addresses: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...props,
  });

export * from './users.repository.mock';
