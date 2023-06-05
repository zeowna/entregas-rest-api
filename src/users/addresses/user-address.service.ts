import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AddressesService } from '../../addresses/addresses.service';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { UpdateAddressDto } from '../../addresses/dto/update-address.dto';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(User)
    private readonly userService: UsersService,
    private readonly addressesService: AddressesService,
  ) {}

  async create(userId: number, address: CreateAddressDto) {
    const userFound = await this.userService.findById(userId);
    const addressCreated = await this.addressesService.create(address);

    await this.userService.update(userFound.id, {
      addresses: [...userFound.addresses, addressCreated],
    });

    return addressCreated;
  }

  async update(userId: number, addressId: number, address: UpdateAddressDto) {
    const userFound = await this.userService.findById(userId);
    const addressUpdate = await this.addressesService.update(
      addressId,
      address,
    );

    await this.userService.update(userFound.id, {
      addresses: [...userFound.addresses, addressUpdate],
    });

    return addressUpdate;
  }

  async removeAddress(id: number, addressId: number) {
    const userFound = await this.userService.findById(id);
    const addressRemoved = await this.addressesService.remove(addressId);

    await this.userService.update(userFound.id, {
      addresses: userFound.addresses.filter(
        ({ id }) => addressRemoved.id === id,
      ),
    });

    return addressRemoved;
  }
}
