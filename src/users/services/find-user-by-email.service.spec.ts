import { FindUserByEmailService } from './find-user-by-email.service';
import { Test } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { ZeownaLoggerModule } from '../../common';
import { BcryptHashService } from '../../hash/services/bcrypt-hash.service';
import { UsersTypeORMRepository } from '../repositores/users-typeorm-repository.service';
import {
  generateCustomerDto,
  UsersRepositoryMock,
} from '../../customers/mocks';

describe('FindUserByEmailService', () => {
  const correlationId = 'any_string';
  let findUserByEmailService: FindUserByEmailService;
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [ZeownaLoggerModule.register()],
      providers: [
        FindUserByEmailService,
        CreateUserService,
        BcryptHashService,
        {
          provide: UsersTypeORMRepository,
          useClass: UsersRepositoryMock,
        },
      ],
    }).compile();

    findUserByEmailService = await app.get<FindUserByEmailService>(
      FindUserByEmailService,
    );
    createUserService = await app.get<CreateUserService>(CreateUserService);
  });

  it('should exist', () => {
    expect(findUserByEmailService).toBeDefined();
  });

  describe('execute()', () => {
    it("should resolve null if user wasn't found", async () => {
      const email = 'ramdom@email.com';

      await expect(findUserByEmailService.execute(email)).resolves.toEqual(
        null,
      );
    });

    it('should resolve User', async () => {
      const createUserDto = generateCustomerDto({
        email: 'ramdom@email.com',
      });

      const expected = await createUserService.execute(
        createUserDto,
        correlationId,
      );

      await expect(
        findUserByEmailService.execute(createUserDto.email),
      ).resolves.toEqual(expected);
    });
  });
});
