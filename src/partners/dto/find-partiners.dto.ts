import { AbstractPagingDto, AbstractPagingDtoProps } from '../../common';
import { Partner } from '../entities/partner.entity';

export class PartnerPagingDto extends AbstractPagingDto<Partner> {
  coordinates: Record<string, number>;

  constructor(props: Partial<AbstractPagingDtoProps>) {
    super(props);
    this.coordinates = props.coordinates ? JSON.parse(props.coordinates) : null;
  }
}
