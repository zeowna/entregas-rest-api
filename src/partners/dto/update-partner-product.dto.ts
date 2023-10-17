import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePartnerProductDto } from './create-partner-product.dto';

export class UpdatePartnerProductDto extends IntersectionType(
  PartialType(CreatePartnerProductDto),
  PickType(CreatePartnerProductDto, ['toEntity']),
) {}
