import { Module } from '@nestjs/common';
import { SendEmailService } from './services/send-email.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SendEmailService],
  exports: [SendEmailService],
})
export class MailerModule {}
