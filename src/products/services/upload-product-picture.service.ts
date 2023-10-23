import { Injectable } from '@nestjs/common';
import { AbstractService, ID, NestLoggerService } from '../../common';
import { Product } from '../entities/product.entity';
import { writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import { ProductsTypeORMRepository } from '../repositories/products-typeorm.repository';

@Injectable()
export class UploadProductPictureService extends AbstractService<Product> {
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

    const pictureURI = `media/pictures/${randomUUID()}.${extension}`;

    await writeFile(`${process.cwd()}/${pictureURI}`, file.buffer);

    const updated = await this.productsRepository.update(
      productId,
      new Product({ pictureURI }),
    );

    this.logAfter({
      file: file.originalname,
      correlationId,
      updated,
    });

    return updated;
  }
}
