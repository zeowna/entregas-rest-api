import { AbstractService, ID, NestLoggerService } from '../../common';
import { randomUUID } from 'crypto';
import { writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersTypeORMRepository } from '../repositores/users-typeorm-repository.service';

@Injectable()
export class UploadUserProfilePictureService extends AbstractService<string> {
  constructor(
    private readonly usersTypeORMRepository: UsersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(userID: ID, file: Express.Multer.File, correlationId: string) {
    this.logBefore({
      file: file.originalname,
      correlationId,
    });

    const extension = file.originalname.substring(
      file.originalname.lastIndexOf('.') + 1,
      file.originalname.length,
    );

    const profilePictureURI = `media/pictures/${randomUUID()}.${extension}`;

    await writeFile(`${process.cwd()}/${profilePictureURI}`, file.buffer);

    const updated = await this.usersTypeORMRepository.update(
      userID,
      new User({ profilePictureURI }),
    );

    this.logAfter({
      file: file.originalname,
      correlationId,
      updated,
    });

    return profilePictureURI;
  }
}
