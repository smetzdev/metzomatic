import { Module } from '@nestjs/common';
import { TogglModule } from './toggl/toggl.module';
import { GmailModule } from './gmail/gmail.module';
import { ConfigModule } from '@nestjs/config';
import { SlackModule } from './slack/slack.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TogglModule,
    GmailModule,
    SlackModule,
  ],
})
export class AppModule {}
