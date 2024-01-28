import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TogglService } from './toggl.service';
import { TogglController } from './toggl.controller';

@Module({
  imports: [HttpModule],
  providers: [TogglService],
  controllers: [TogglController],
})
export class TogglModule {}
