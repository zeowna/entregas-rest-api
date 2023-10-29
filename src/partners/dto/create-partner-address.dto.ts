import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { ID } from '../../common';

export class CreatePartnerAddressDto extends CreateAddressDto {
  partnerId: ID;
}
