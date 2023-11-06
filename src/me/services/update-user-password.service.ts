import { Injectable } from '@nestjs/common';
import { AbstractService, ID, NestLoggerService } from '../../common';
import { BcryptHashService } from '../../hash/services/bcrypt-hash.service';
import { UpdateUserService } from '../../users/services/update-user.service';
import { UpdateUserPasswordDto } from '../../users/dto/update-user-password.dto';
import { FindUserByIdService } from '../../users/services/find-user-by-id.service';

@Injectable()
export class UpdateUserPasswordService extends AbstractService<void> {
  constructor(
    private readonly findUserByIdService: FindUserByIdService,
    private readonly hashService: BcryptHashService,
    private readonly updateUserService: UpdateUserService,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(
    id: ID,
    updateUserPasswordDto: UpdateUserPasswordDto,
    correlationId: string,
  ) {
    this.logBefore({
      id,
      updateUserPasswordDto,
      correlationId,
    });

    const user = await this.findUserByIdService.execute(id, correlationId);

    const updated = await this.updateUserService.execute(
      user.id,
      new UpdateUserPasswordDto({
        password: await this.hashService.hashPassword(
          updateUserPasswordDto.password,
        ),
      }),
      correlationId,
    );

    this.logAfter({ success: true, updated, correlationId });
  }
}
