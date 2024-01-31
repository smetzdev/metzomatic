import { Module } from '@nestjs/common';
import { GmailService } from './gmail/gmail.service';
import { AuthService } from './auth/auth.service';

@Module({
  providers: [GmailService, AuthService],
  exports: [GmailService],
})
export class GoogleCloudModule {}
