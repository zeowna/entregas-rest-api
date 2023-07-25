import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractTypeORMEntity, ExcludeMethods } from '../../common';
import { AddressResponse } from '../responses/address.response';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Address extends AbstractTypeORMEntity {
  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  neighbourhood: string;

  @Column()
  number: number;

  @Column({ nullable: true })
  complement?: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @ManyToOne(() => User, { nullable: true })
  user: User;

  constructor(props: ExcludeMethods<Address>) {
    super(props);
    this.cep = props?.cep;
    this.street = props?.street;
    this.neighbourhood = props?.neighbourhood;
    this.number = props?.number;
    this.complement = props?.complement;
    this.city = props?.city;
    this.state = props?.state;
  }

  present() {
    return new AddressResponse(this);
  }
}
