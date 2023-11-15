import { Controller } from '@nestjs/common';

@Controller('users')
export class CustomerAddressesController {
  // constructor(private userAddressesService: UserAddressService) {}
  //
  // @Post(':userId/addresses')
  // async create(@Param('userId') userId, createAddressDto: CreateAddressDto) {
  //   return this.userAddressesService.create(userId, createAddressDto);
  // }
  //
  // @Patch(':userId/addresses/:addressId')
  // async update(
  //   @Param('userId') userId,
  //   @Param('addressId') addressId,
  //   updateAddressDto: UpdateAddressDto,
  // ) {
  //   return this.userAddressesService.update(
  //     userId,
  //     addressId,
  //     updateAddressDto,
  //   );
  // }
}
