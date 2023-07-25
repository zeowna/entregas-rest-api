import { User } from './user.entity';
import { ChildEntity } from 'typeorm';
import { UserTypes } from './user-types.enum';
import { PartnerUserResponse } from '../responses/partner-user.response';

@ChildEntity(UserTypes.Partner)
export class PartnerUser extends User {
  readonly type: UserTypes.Partner;

  present() {
    return new PartnerUserResponse(this);
  }
}
