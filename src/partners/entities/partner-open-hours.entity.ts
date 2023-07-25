import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractTypeORMEntity } from '../../common';
import { Partner } from './partner.entity';
import { PartnerOpenHoursResponse } from '../responses/partner-open-hours.reponse';

@Entity()
export class PartnerOpenHours extends AbstractTypeORMEntity {
  @Column({ type: 'integer' })
  dayOfWeek: number;

  @Column()
  opensAt: Date;

  @Column()
  closesAt: Date;

  @ManyToOne(() => Partner)
  @JoinColumn()
  partner: Partner;

  present() {
    return new PartnerOpenHoursResponse(this);
  }
}
