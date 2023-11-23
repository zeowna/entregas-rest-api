import { Injectable } from '@nestjs/common';
import { CreateAddressService } from '../../addresses/services/create-address.service';
import { AddressesTypeORMRepository } from '../../addresses/repositories/addresses-typeorm-repository';
import { GeocodingService } from '../../addresses/services/geocoding.service';
import { NestLoggerService } from '../../common';
import { CreateOrderAddressDto } from '../dto/create-order-address.dto';
import { Address } from '../../addresses/entities/address.entity';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { UpdateOrderService } from './update-order.service';

@Injectable()
export class CreateOrderAddress extends CreateAddressService {
  constructor(
    protected readonly addressesRepository: AddressesTypeORMRepository,
    protected readonly geocodingService: GeocodingService,
    private readonly updateOrderService: UpdateOrderService,
    protected readonly logger: NestLoggerService,
  ) {
    super(addressesRepository, geocodingService, logger);
  }

  protected async afterCreate(
    createEntityDto: CreateOrderAddressDto,
    entity: Address,
    correlationId: string,
  ) {
    await this.updateOrderService.execute(
      createEntityDto.orderId,
      new UpdateOrderDto({
        addressId: entity.id,
      }),
      correlationId,
    );
  }
}
