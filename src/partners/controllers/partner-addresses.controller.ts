import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CustomRequest } from '../../common';
import { CreatePartnerAddressService } from '../services/create-partner-address.service';
import { CreatePartnerAddressDto } from '../dto/create-partner-address.dto';
import { UpdatePartnerAddressDto } from '../dto/update-partner-address.dto';
import { UpdateAddressService } from '../../addresses/services/update-address.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserTypes } from '../../users/entities/user-types.enum';
import { AuthGuard } from '../../common/auth';
import { RolesGuard } from '../../auth/guards/routes.guard';

@Controller('partners')
export class PartnerAddressesController {
  constructor(
    private readonly createPartnerAddressService: CreatePartnerAddressService,
    private readonly updatePartnerAddressService: UpdateAddressService,
  ) {}

  @Roles([UserTypes.Admin, UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @Post(':partnerId([0-9]+)/addresses')
  async create(
    @Request() request: CustomRequest,
    @Param('partnerId') partnerId: string,
    @Body() createPartnerAddressDto: CreatePartnerAddressDto,
  ) {
    createPartnerAddressDto.partnerId = request.user.partnerId || +partnerId;

    return this.createPartnerAddressService.execute(
      createPartnerAddressDto,
      request.correlationId,
    );
  }

  @Roles([UserTypes.Admin, UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':partnerId([0-9]+)/addresses/:id([0-9]+)')
  async update(
    @Request() request: CustomRequest,
    @Param('partnerId') partnerId: string,
    @Param('id') id: string,
    @Body() updatePartnerAddressDto: UpdatePartnerAddressDto,
  ) {
    updatePartnerAddressDto.partnerId = request.user.partnerId || +partnerId;

    return this.updatePartnerAddressService.execute(
      +id,
      updatePartnerAddressDto,
      request.correlationId,
    );
  }
}
