import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ViaCepService } from '../services/via-cep-service';
import { CustomRequest } from '../../common';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserTypes } from '../../users/entities/user-types.enum';
import { AuthGuard } from '../../common/auth';
import { RolesGuard } from '../../auth/guards/routes.guard';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly viaCepService: ViaCepService) {}

  @Roles([UserTypes.Admin, UserTypes.Partner, UserTypes.Customer])
  @UseGuards(AuthGuard, RolesGuard)
  @Get('cep/:cep')
  async findByCep(
    @Request() request: CustomRequest,
    @Param('cep') cep: string,
  ) {
    return this.viaCepService.execute(cep, request.correlationId);
  }
}
