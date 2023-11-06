import { Module } from '@nestjs/common';
import { UsersHttpModule } from '../users/users-http.module';
import { MeController } from './controllers/me.controller';
import { UpdateUserPasswordService } from './services/update-user-password.service';
import { HashModule } from '../hash/hash.module';

@Module({
  imports: [UsersHttpModule, HashModule],
  controllers: [MeController],
  providers: [UpdateUserPasswordService],
})
export class MeHttpModule {}
