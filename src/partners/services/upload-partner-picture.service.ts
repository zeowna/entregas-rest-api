import { AbstractService, ID, NestLoggerService } from '../../common';
import { randomUUID } from 'crypto';
import { writeFile } from 'fs/promises';
import { Partner } from '../entities/partner.entity';
import { PartnersTypeORMRepository } from '../repositores/partners-typeorm.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadPartnerPictureService extends AbstractService<Partner> {
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

    const pictureURI = `media/pictures/${randomUUID()}.${extension}`;

    await writeFile(`${process.cwd()}/${pictureURI}`, file.buffer);

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
