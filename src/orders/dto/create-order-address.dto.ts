import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { ID } from '../../common';

export class CreateOrderAddressDto extends CreateAddressDto {
  orderId: ID;
}
