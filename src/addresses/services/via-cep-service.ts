import { Injectable } from '@nestjs/common';
import { Address } from '../entities/address.entity';
import axios from 'axios';
import { AbstractService, NestLoggerService } from '../../common';

@Injectable()
export class ViaCepService extends AbstractService<Address> {
  private readonly url = 'https://viacep.com.br/ws/:cep/json/';

  constructor(private readonly logger: NestLoggerService) {
    super(logger);
  }

  async execute(cep: string, correlationId: string) {
    this.logBefore({
      cep,
      correlationId,
    });

    const { data: found } = await axios.get(this.url.replace(':cep', cep));

    if (!found) {
      this.logAfter({
        cep,
        correlationId,
      });
      return null;
    }

    const address = new Address({
      cep: found.cep,
      street: found.logradouro,
      city: found.localidade,
      neighbourhood: found.bairro,
      state: found.uf,
    });

    this.logAfter({
      found,
      address,
      correlationId,
    });

    return address;
  }
}
