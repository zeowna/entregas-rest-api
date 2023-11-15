import { AbstractEntityPresenter } from '../../common';
import { Partner } from '../entities/partner.entity';
import { PartnerStatus } from '../entities/partner.status';
import { AddressResponse } from '../../addresses/responses/address.response';

export class PartnerResponse extends AbstractEntityPresenter<Partner> {
  name: string;

  cnpj: string;

  pictureURI: string;

  status: PartnerStatus;

  address: AddressResponse;

  openingHours: string;

  closingHours: string;

  constructor(props: Partner) {
    super(props);
    this.name = props?.name;
    this.cnpj = props?.cnpj;
    this.pictureURI = props?.pictureURI;
    this.status = props?.status;
    this.address = props?.address?.present();
    this.openingHours = props?.openingHours;
    this.closingHours = props?.closingHours;
  }
}
