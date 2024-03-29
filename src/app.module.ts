import { Module } from '@nestjs/common';
import { TogglModule } from './toggl/toggl.module';
import { ConfigModule } from '@nestjs/config';
import { SlackModule } from './slack/slack.module';
import { GoogleCloudModule } from './google-cloud/google-cloud.module';
import { ThingsModule } from './things/things.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        TOGGL_API_TOKEN: Joi.string().required(),
        TOGGL_WORKSPACE_ID: Joi.number().required(),
        GMAIL_USER_EMAIL: Joi.string().required(),
        GCLOUD_CLIENT_ID: Joi.string().required(),
        GCLOUD_CLIENT_SECRET: Joi.string().required(),
        GCLOUD_REFRESH_TOKEN: Joi.string().required(),
        GMAIL_FROM_NAME: Joi.string(),
        SLACK_AUTH_TOKEN: Joi.string().required(),
        SLACK_USER_ID: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),
    TogglModule,
    SlackModule,
    GoogleCloudModule,
    ThingsModule,
    WebhooksModule,
  ],
})
export class AppModule {}
