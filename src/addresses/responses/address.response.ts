import { AbstractEntityPresenter } from '../../common';
import { Address } from '../entities/address.entity';

export class AddressResponse extends AbstractEntityPresenter<Address> {
  cep: string;

  street: string;

  neighbourhood: string;

  number: number;

  complement: string;

  city: string;

  state: string;

  lat: number;

  lng: number;

  constructor(props: Address) {
    super(props);
    this.cep = props?.cep;
    this.street = props?.street;
    this.neighbourhood = props?.neighbourhood;
    this.number = props?.number;
    this.complement = props?.complement;
    this.city = props?.city;
    this.state = props?.state;
    this.lat = props?.lat;
    this.lng = props?.lng;
  }
}
