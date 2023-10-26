import { CreateUserDto } from '../../users/dto/create-user.dto';
import { PartnerUser } from '../../users/entities/partner-user.entity';
import { Partner } from '../entities/partner.entity';

export class CreatePartnerUserDto extends CreateUserDto {
  partnerId: number;

  toEntity() {
    return new PartnerUser({
      name: this.name,
      birthday: this.birthday,
      cpf: this.cpf,
      email: this.email,
      password: this.password,
      partner: new Partner({ id: this.partnerId }),
    });
  }
}
