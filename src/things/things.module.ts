import { Module } from '@nestjs/common';
import { ThingsService } from './things.service';
import { GoogleCloudModule } from '../google-cloud/google-cloud.module';

@Module({
  providers: [ThingsService],
  exports: [ThingsService],
  imports: [GoogleCloudModule],
})
export class ThingsModule {}
