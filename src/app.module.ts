import { Module } from '@nestjs/common';
import { TogglModule } from './toggl/toggl.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TogglModule,
  ],
})
export class AppModule {}
