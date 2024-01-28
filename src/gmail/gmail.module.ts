import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { GmailController } from './gmail.controller';

@Module({
  providers: [GmailService],
  controllers: [GmailController],
})
export class GmailModule {}
