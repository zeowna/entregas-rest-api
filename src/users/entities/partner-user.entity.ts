import { User } from './user.entity';
import { ChildEntity, ManyToOne } from 'typeorm';
import { UserTypes } from './user-types.enum';
import { PartnerUserResponse } from '../responses/partner-user.response';
import { Partner } from '../../partners/entities/partner.entity';
import { ExcludeMethods } from '../../common';

@ChildEntity(UserTypes.Partner)
export class PartnerUser extends User {
  constructor(props: ExcludeMethods<PartnerUser>) {
    super(props);
    this.partner = props?.partner;
  }

  @ManyToOne(() => Partner, { eager: true })
  partner: Partner;

  readonly type = UserTypes.Partner;

  present() {
    return new PartnerUserResponse(this);
  }
}
