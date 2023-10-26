import { Injectable } from '@nestjs/common';
import { UsersTypeORMRepository } from '../../users/repositores/users-typeorm-repository.service';
import { PartnerUser } from '../../users/entities/partner-user.entity';
import { ID } from '../../common';

@Injectable()
export class PartnerUsersTypeORMRepository extends UsersTypeORMRepository<PartnerUser> {
  async findByPartnerId(partnerId: ID) {
    return this.usersRepository.findOneBy({
      partner: { id: partnerId },
    });
  }
}
