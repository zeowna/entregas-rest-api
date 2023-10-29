import { Body, Controller, Param, Patch, Post, Request } from '@nestjs/common';
import { CustomRequest } from '../../common';
import { CreatePartnerAddressService } from '../services/create-partner-address.service';
import { CreatePartnerAddressDto } from '../dto/create-partner-address.dto';
import { UpdatePartnerAddressDto } from '../dto/update-partner-address.dto';
import { UpdateAddressService } from '../../addresses/services/update-address.service';

@Controller('partners')
export class PartnerAddressesController {
  constructor(
    private readonly createPartnerAddressService: CreatePartnerAddressService,
    private readonly updatePartnerAddressService: UpdateAddressService,
  ) {}

  @Post(':partnerId([0-9]+)/addresses')
  async create(
    @Request() request: CustomRequest,
    @Param('partnerId') partnerId: string,
    @Body() createPartnerAddressDto: CreatePartnerAddressDto,
  ) {
    createPartnerAddressDto.partnerId = +partnerId;

    return this.createPartnerAddressService.execute(
      createPartnerAddressDto,
      request.correlationId,
    );
  }

  @Patch(':partnerId([0-9]+)/addresses/:id([0-9]+)')
  async update(
    @Request() request: CustomRequest,
    @Param('partnerId') partnerId: string,
    @Param('id') id: string,
    @Body() updatePartnerAddressDto: UpdatePartnerAddressDto,
  ) {
    updatePartnerAddressDto.partnerId = +partnerId;

    return this.updatePartnerAddressService.execute(
      +id,
      updatePartnerAddressDto,
      request.correlationId,
    );
  }
}
