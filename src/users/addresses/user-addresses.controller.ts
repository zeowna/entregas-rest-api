import { Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { UserAddressService } from './user-address.service';
import { UpdateAddressDto } from '../../addresses/dto/update-address.dto';

@Controller('users')
export class UserAddressesController {
  constructor(private userAddressesService: UserAddressService) {}

  @Post(':userId/addresses')
  async create(@Param('userId') userId, createAddressDto: CreateAddressDto) {
    return this.userAddressesService.create(userId, createAddressDto);
  }

  @Patch(':userId/addresses/:addressId')
  async update(
    @Param('userId') userId,
    @Param('addressId') addressId,
    updateAddressDto: UpdateAddressDto,
  ) {
    return this.userAddressesService.update(
      userId,
      addressId,
      updateAddressDto,
    );
  }
}
