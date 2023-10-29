import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';
import { AbstractTypeORMEntity, ExcludeMethods } from '../../common';
import { PartnerResponse } from '../responses/partner.reponse';
import { PartnerStatus } from './partner.status';

@Entity()
export class Partner extends AbstractTypeORMEntity {
  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column({ nullable: true })
  pictureURI?: string;

  @Column({ default: PartnerStatus.Active })
  status: PartnerStatus;

  @Column({ default: '07:00' })
  openingHours: string;

  @Column({ default: '21:00' })
  closingHours: string;

  @OneToOne(() => Address, { nullable: true, eager: true })
  @JoinColumn()
  address: Address;

  constructor(props: ExcludeMethods<Partner>) {
    super(props);
    this.name = props?.name;
    this.cnpj = props?.cnpj;
    this.pictureURI = props?.pictureURI;
    this.openingHours = props?.openingHours;
    this.closingHours = props?.closingHours;
    this.address = props?.address;
  }

  present() {
    return new PartnerResponse(this);
  }
}
