import { Controller, Get, Param, Request } from '@nestjs/common';
import { ViaCepService } from '../services/via-cep-service';
import { CustomRequest } from '../../common';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly viaCepService: ViaCepService) {}

  @Get('cep/:cep')
  async findByCep(
    @Request() request: CustomRequest,
    @Param('cep') cep: string,
  ) {
    return this.viaCepService.execute(cep, request.correlationId);
  }
}
