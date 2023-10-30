import { AbstractService, ID, NestLoggerService } from '../../common';
import { randomUUID } from 'crypto';
import { writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { PartnerUsersTypeORMRepository } from '../repositores/partner-users-typeorm.repository';
import { PartnerUser } from '../../users/entities/partner-user.entity';

@Injectable()
export class UploadPartnerUserPictureService extends AbstractService<string> {
  constructor(
    private readonly partnerUsersTypeORMRepository: PartnerUsersTypeORMRepository,
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

    const profilePictureURI = `media/pictures/${randomUUID()}.${extension}`;

    await writeFile(`${process.cwd()}/${profilePictureURI}`, file.buffer);

    const updated = await this.partnerUsersTypeORMRepository.update(
      partnerId,
      new PartnerUser({ profilePictureURI }),
    );

    this.logAfter({
      file: file.originalname,
      correlationId,
      updated,
    });

    return profilePictureURI;
  }
}
