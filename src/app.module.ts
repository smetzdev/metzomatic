import { Module } from '@nestjs/common';
import { TogglModule } from './toggl/toggl.module';
import { GmailModule } from './gmail/gmail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TogglModule,
    GmailModule,
  ],
})
export class AppModule {}
