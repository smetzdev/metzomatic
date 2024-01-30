import { Module } from '@nestjs/common';
import { GmailService } from './gmail/gmail.service';

@Module({
  providers: [GmailService],
})
export class GoogleCloudModule {}
