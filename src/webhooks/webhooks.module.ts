import { Module } from '@nestjs/common';
import { SlackModule } from '../slack/slack.module';
import { ThingsModule } from '../things/things.module';
import { GithubController } from './github/github.controller';
import { GithubService } from './github/github.service';

/**
 * This module is responsible for handling webhooks from external services.
 * it should provide several webhook endpoints via it's controller.
 */
@Module({
  controllers: [GithubController],
  providers: [GithubService],
  imports: [SlackModule, ThingsModule],
})
export class WebhooksModule {}
