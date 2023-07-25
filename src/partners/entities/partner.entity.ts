import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';
import { PartnerOpenHours } from './partner-open-hours.entity';
import { AbstractTypeORMEntity, ExcludeMethods } from '../../common';
import { PartnerResponse } from '../responses/partner.reponse';

@Entity()
export class Partner extends AbstractTypeORMEntity {
  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column({ nullable: true })
  pictureURI?: string;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @OneToMany(() => PartnerOpenHours, ({ partner }) => partner, { eager: true })
  openHours: PartnerOpenHours[];

  constructor(props: ExcludeMethods<Partner>) {
    super(props);
    this.name = props?.name;
    this.cnpj = props?.cnpj;
    this.pictureURI = props?.pictureURI;
    this.address = props?.address;
    this.openHours = props?.openHours;
  }

  present() {
    return new PartnerResponse(this);
  }
}
