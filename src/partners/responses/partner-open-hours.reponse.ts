import { PartnerOpenHours } from '../entities/partner-open-hours.entity';
import { AbstractEntityPresenter } from '../../common';
import { Partner } from '../entities/partner.entity';

export class PartnerOpenHoursResponse extends AbstractEntityPresenter<PartnerOpenHours> {
  dayOfWeek: number;

  opensAt: Date;

  closesAt: Date;

  partner: Partner;

  constructor(props: PartnerOpenHours) {
    super(props);
    this.dayOfWeek = props?.dayOfWeek;
    this.opensAt = props?.opensAt;
    this.closesAt = props?.closesAt;
    this.partner = props?.partner;
  }
}
