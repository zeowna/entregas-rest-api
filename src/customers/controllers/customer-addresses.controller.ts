import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateAddressService } from '../../addresses/services/create-address.service';
import { CustomRequest } from '../../common';
import { CreateCustomerAddressDto } from '../dto/create-customer-address.dto';
import { RemoveAddressService } from '../../addresses/services/remove-address.service';
import { AuthGuard } from '../../common/auth';

@Controller('customers')
export class CustomerAddressesController {
  constructor(
    private readonly createAddressService: CreateAddressService,
    private readonly removeAddressService: RemoveAddressService,
  ) {}

  @UseGuards(AuthGuard)
  @Post(':customerId([0-9]+)/addresses')
  async create(
    @Req() request: CustomRequest,
    @Param('customerId') customerId: string,
    @Body() createCustomerAddressDto: CreateCustomerAddressDto,
  ) {
    createCustomerAddressDto.customerId = +customerId;

    return this.createAddressService.execute(
      createCustomerAddressDto,
      request.correlationId,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':customerId([0-9]+)/addresses/:id([0-9]+)')
  async remove(
    @Req() request: CustomRequest,
    @Param('customerId') customerId: string,
    @Param('id') id: string,
  ) {
    return this.removeAddressService.execute(+id, request.correlationId);
  }
}
