import { Injectable } from '@nestjs/common';
import { AbstractService, ID, NestLoggerService } from '../../common';
import { Product } from '../entities/product.entity';
import { randomUUID } from 'crypto';
import { ProductsTypeORMRepository } from '../repositories/products-typeorm.repository';
import { unlink, writeFile } from 'fs/promises';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class UploadProductPictureService extends AbstractService<Product> {
  private readonly storage = new Storage();

  constructor(
    private readonly productsRepository: ProductsTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(
    productId: ID,
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

    const bucket = this.storage.bucket('entregas-media');

    const pictureName = `${randomUUID()}.${extension}`;
    const localPath = `/tmp/${pictureName}`;
    const remotePath = `pictures/${pictureName}`;
    const pictureURI = `https://storage.googleapis.com/entregas-media/${remotePath}`;

    await writeFile(localPath, file.buffer);

    await bucket.upload(localPath, {
      destination: remotePath,
    });

    const updated = await this.productsRepository.update(
      productId,
      new Product({ pictureURI }),
    );

    await unlink(localPath);

    this.logAfter({
      file: file.originalname,
      correlationId,
      updated,
    });

    return updated;
  }
}
