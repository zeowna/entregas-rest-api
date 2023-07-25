import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerUser } from './entities/customer-user.entity';
import { User } from './entities/user.entity';
import { AdminUser } from './entities/admin-user.entity';
import { PartnerUser } from './entities/partner-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AdminUser, CustomerUser, PartnerUser]),
  ],
  exports: [TypeOrmModule],
})
export class UsersModule {}
