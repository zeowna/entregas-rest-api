import { Injectable } from '@nestjs/common';
import { AbstractService, NestLoggerService } from '../../common';
import { Partner } from '../entities/partner.entity';
import { PartnersTypeORMRepository } from '../repositores/partners-typeorm.repository';

@Injectable()
export class FindPartnerByCNPJService extends AbstractService<Partner> {
  constructor(
    private readonly partnersRepository: PartnersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  private async findByCnpj(cnpj: string) {
    return this.partnersRepository.findByCnpj(cnpj);
  }

  async execute(cnpj: string, correlationId: string) {
    this.logBefore({ cnpj, correlationId });

    const found = await this.findByCnpj(cnpj);

    this.logAfter({ success: true, found, cnpj, correlationId });

    return found;
  }
}
