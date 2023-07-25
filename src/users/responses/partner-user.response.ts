import { UserResponse } from './user.response';
import { PartnerUser } from '../entities/partner-user.entity';

export class PartnerUserResponse extends UserResponse {
  constructor(props: PartnerUser) {
    super(props);
  }
}
