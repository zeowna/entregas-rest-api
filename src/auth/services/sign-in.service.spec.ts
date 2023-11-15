import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from './sign-in.service';
import { SignInDto } from '../dto/sign-in.dto';
import { CreateUserService } from '../../users/services/create-user.service';
import { ZeownaLoggerModule } from '../../common';
import { ZeownaAuthModule } from '../../common/auth';
import { FindUserByEmailService } from '../../users/services/find-user-by-email.service';
import { BcryptHashService } from '../../hash/services/bcrypt-hash.service';
import { UsersTypeORMRepository } from '../../users/repositores/users-typeorm-repository.service';
import {
  generateCustomerDto,
  UsersRepositoryMock,
} from '../../customers/mocks';

describe('SignInService', () => {
  const correlationId = 'any_string';
  let signInService: SignInService;
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ZeownaLoggerModule.register({ global: true }),
        ZeownaAuthModule.register({ global: true }),
      ],
      providers: [
        SignInService,
        FindUserByEmailService,
        CreateUserService,
        {
          provide: UsersTypeORMRepository,
          useClass: UsersRepositoryMock,
        },
        BcryptHashService,
      ],
    }).compile();

    signInService = module.get<SignInService>(SignInService);
    createUserService = module.get<CreateUserService>(CreateUserService);
  });

  it('should be defined', () => {
    expect(signInService).toBeDefined();
  });

  describe('execute()', () => {
    it('should be defined', () => {
      expect(signInService.execute).toBeDefined();
    });

    it("should reject with Unauthorized if password isn't equal", async () => {
      const createUserDto = generateCustomerDto({});

      await createUserService.execute(createUserDto, correlationId);

      await expect(
        signInService.execute(
          new SignInDto({
            email: createUserDto.email,
            password: 'wrong password',
          }),
          correlationId,
        ),
      ).rejects.toThrow("User password doesn't match");
    });

    it('should resolve if password is equal', async () => {
      const createUserDto = generateCustomerDto({});

      await createUserService.execute(createUserDto, correlationId);

      await expect(
        signInService.execute(
          new SignInDto({
            email: createUserDto.email,
            password: createUserDto.password,
          }),
          correlationId,
        ),
      ).resolves.not.toThrow();
    });
  });
});
