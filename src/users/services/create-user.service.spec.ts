import { Test } from '@nestjs/testing';
import { NestLoggerService, ZeownaLoggerModule } from '../../common';
import { UsersTypeORMRepository } from '../repositores/users-typeorm-repository.service';
import { BcryptHashService } from '../../hash/services/bcrypt-hash.service';
import {
  generateCustomerDto,
  UsersRepositoryMock,
} from '../../customers/mocks';
import { CreateUserService } from './create-user.service';

describe('CreateUserService.ts', () => {
  let createUserService: CreateUserService;
  const correlationId = 'correlationId';
  let hashPasswordSpy: jest.SpyInstance<Promise<string>, [password: string]>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ZeownaLoggerModule.register()],
      providers: [
        CreateUserService,
        {
          provide: UsersTypeORMRepository,
          useClass: UsersRepositoryMock,
        },
        BcryptHashService,
        NestLoggerService,
      ],
    }).compile();

    createUserService = module.get<CreateUserService>(CreateUserService);
    hashPasswordSpy = jest.spyOn(BcryptHashService.prototype, 'hashPassword');
  });

  it('should be defined', () => {
    expect(createUserService).toBeDefined();
  });

  describe('execute', () => {
    it('should create User with hashed password', async () => {
      const dto = generateCustomerDto();
      const expected = dto.password;

      await createUserService.execute(dto, correlationId);

      expect(hashPasswordSpy).toBeCalledTimes(1);
      expect(hashPasswordSpy).toBeCalledWith(expected);
    });
  });
});
