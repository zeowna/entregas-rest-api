import { FindUserByCpfService } from './find-user-by-cpf.service';
import { Test } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { ZeownaLoggerModule } from '../../common';
import { BcryptHashService } from '../../hash/services/bcrypt-hash.service';
import { UsersTypeORMRepository } from '../repositores/users-typeorm-repository.service';
import {
  generateCustomerDto,
  UsersRepositoryMock,
} from '../../customers/mocks';

describe('FindUserByCpfService', () => {
  const correlationId = 'any_string';
  let findUserByCpfService: FindUserByCpfService;
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [ZeownaLoggerModule.register()],
      providers: [
        FindUserByCpfService,
        CreateUserService,
        BcryptHashService,
        {
          provide: UsersTypeORMRepository,
          useClass: UsersRepositoryMock,
        },
      ],
    }).compile();

    findUserByCpfService = await app.get<FindUserByCpfService>(
      FindUserByCpfService,
    );
    createUserService = await app.get<CreateUserService>(CreateUserService);
  });

  it('should exist', () => {
    expect(findUserByCpfService).toBeDefined();
  });

  describe('execute()', () => {
    it("should resolve null if user wasn't found", async () => {
      const cpf = 'random_cpf';

      await expect(findUserByCpfService.execute(cpf)).resolves.toEqual(null);
    });

    it('should resolve User', async () => {
      const createUserDto = generateCustomerDto({
        cpf: 'random_cpf',
      });

      const expected = await createUserService.execute(
        createUserDto,
        correlationId,
      );

      await expect(
        findUserByCpfService.execute(createUserDto.cpf),
      ).resolves.toEqual(expected);
    });
  });
});
