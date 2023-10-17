import { Injectable, NotFoundException } from '@nestjs/common';
import { BcryptHashService } from '../../hash/services/bcrypt-hash.service';
import { AbstractService, NestLoggerService } from '../../common';
import { FindUserByEmailService } from '../../users/services/find-user-by-email.service';
import { randomUUID } from 'crypto';
import { UpdateUserService } from '../../users/services/update-user.service';
import { UpdateUserPasswordDto } from '../../users/dto/update-user-password.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';

/**
 * @TODO: Send a noitification with the new Passwortd
 */
@Injectable()
export class ForgotPasswordService extends AbstractService<void> {
  constructor(
    private readonly findUserByEmailService: FindUserByEmailService,
    private readonly hashService: BcryptHashService,
    private readonly updateUserService: UpdateUserService,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(forgotPasswordDto: ForgotPasswordDto, correlationId: string) {
    const { email } = forgotPasswordDto;

    this.logBefore({
      email,
    });

    const user = await this.findUserByEmailService.execute(
      email,
      correlationId,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newPassword = randomUUID();

    const updated = await this.updateUserService.execute(
      user.id,
      new UpdateUserPasswordDto({
        password: await this.hashService.hashPassword(newPassword),
      }),
      correlationId,
    );

    console.log({ newPassword });

    this.logAfter({ success: true, correlationId });
  }
}
