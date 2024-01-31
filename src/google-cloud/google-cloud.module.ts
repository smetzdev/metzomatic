import { Module } from '@nestjs/common';
import { GmailService } from './gmail/gmail.service';
import { AuthService } from './auth/auth.service';
import { GdriveService } from './gdrive/gdrive.service';

@Module({
  providers: [GmailService, AuthService, GdriveService],
  exports: [GmailService, GdriveService],
})
export class GoogleCloudModule {}
