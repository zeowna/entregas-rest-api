import { AbstractEntityPresenter } from '../../common';
import { Partner } from '../entities/partner.entity';
import { Address } from '../../addresses/entities/address.entity';
import { PartnerStatus } from '../entities/partner.status';

export class PartnerResponse extends AbstractEntityPresenter<Partner> {
  name: string;

  cnpj: string;

  pictureURI: string;

  status: PartnerStatus;

  address: Address;

  openingHours: string;

  closingHours: string;

  constructor(props: Partner) {
    super(props);
    this.name = props?.name;
    this.cnpj = props?.cnpj;
    this.pictureURI = props?.pictureURI;
    this.status = props?.status;
    this.address = props?.address;
    this.openingHours = props?.openingHours;
    this.closingHours = props?.closingHours;
  }
}
