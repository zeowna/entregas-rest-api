import { AbstractService, ID, NestLoggerService } from '../../common';
import { randomUUID } from 'crypto';
import { Partner } from '../entities/partner.entity';
import { PartnersTypeORMRepository } from '../repositores/partners-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { unlink, writeFile } from 'fs/promises';

@Injectable()
export class UploadPartnerPictureService extends AbstractService<Partner> {
  private readonly storage = new Storage();

  constructor(
    private readonly partnersRepository: PartnersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(
    partnerId: ID,
    file: Express.Multer.File,
    correlationId: string,
  ) {
    this.logBefore({
      file: file.originalname,
      correlationId,
    });

    const extension = file.originalname.substring(
      file.originalname.lastIndexOf('.') + 1,
      file.originalname.length,
    );

    const pictureName = `${randomUUID()}.${extension}`;
    const localPath = `/tmp/${pictureName}`;
    const remotePath = `pictures/${pictureName}`;
    const pictureURI = `https://storage.googleapis.com/entregas-media/${remotePath}`;

    const bucket = this.storage.bucket('entregas-media');

    await writeFile(localPath, file.buffer);

    await bucket.upload(localPath, {
      destination: remotePath,
    });

    await unlink(localPath);

    const updated = await this.partnersRepository.update(
      partnerId,
      new Partner({ pictureURI }),
    );

    this.logAfter({
      file: file.originalname,
      correlationId,
      updated,
    });

    return updated;
  }
}
