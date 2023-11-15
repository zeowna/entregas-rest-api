import { AbstractService, ID, NestLoggerService } from '../../common';
import { randomUUID } from 'crypto';
import { unlink, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersTypeORMRepository } from '../repositores/users-typeorm-repository.service';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class UploadUserProfilePictureService extends AbstractService<string> {
  private readonly storage = new Storage();

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

    const bucket = this.storage.bucket('entregas-media');

    const pictureName = `${randomUUID()}.${extension}`;
    const localPath = `/tmp/${pictureName}`;
    const remotePath = `pictures/${pictureName}`;
    const profilePictureURI = `https://storage.googleapis.com/entregas-media/${remotePath}`;

    await writeFile(localPath, file.buffer);

    await bucket.upload(localPath, {
      destination: remotePath,
    });

    await unlink(localPath);

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
