import { PartialType } from '@nestjs/mapped-types';
import { CreatePartnerProductDto } from './create-partner-product.dto';

export class UpdatePartnerProductDto extends PartialType(
  CreatePartnerProductDto,
) {}
