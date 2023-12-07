import { Injectable } from '@nestjs/common';
import { AbstractService, NestLoggerService } from '../../common';
import { PartnersTypeORMRepository } from '../repositores/partners-typeorm.repository';

@Injectable()
export class SetPartnersOfflineScheduler extends AbstractService<boolean> {
  constructor(
    private readonly partnersRepository: PartnersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(correlationId: string) {
    this.logBefore({
      correlationId,
    });

    try {
      await this.partnersRepository.setPartnersOfflineByClosingHours();

      this.logAfter({
        correlationId,
        success: true,
      });

      return true;
    } catch (err) {
      this.logAfter({
        err,
        correlationId,
        success: false,
      });

      return false;
    }
  }
}
