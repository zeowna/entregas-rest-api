import { UserResponse } from './user.response';
import { PartnerUser } from '../entities/partner-user.entity';
import { PartnerResponse } from '../../partners/responses/partner.reponse';

export class PartnerUserResponse extends UserResponse {
  partner: PartnerResponse;

  constructor(props: PartnerUser) {
    super(props);
    this.partner = props?.partner?.present();
  }
}
