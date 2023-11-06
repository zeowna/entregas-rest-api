import { Module } from '@nestjs/common';
import { AdminUsersController } from './controllers/admin-users.controller';
import { UsersHttpModule } from '../users/users-http.module';

@Module({
  imports: [UsersHttpModule],
  controllers: [AdminUsersController],
})
export class AdminModule {}
