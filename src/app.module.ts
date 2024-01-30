import { Module } from '@nestjs/common';
import { TogglModule } from './toggl/toggl.module';
import { ConfigModule } from '@nestjs/config';
import { SlackModule } from './slack/slack.module';
import { GoogleCloudModule } from './google-cloud/google-cloud.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        TOGGL_API_TOKEN: Joi.string().required(),
        TOGGL_WORKSPACE_ID: Joi.number().required(),
        GMAIL_USER_EMAIL: Joi.string().required(),
        GMAIL_CLIENT_ID: Joi.string().required(),
        GMAIL_CLIENT_SECRET: Joi.string().required(),
        GMAIL_REFRESH_TOKEN: Joi.string().required(),
        GMAIL_FROM_NAME: Joi.string(),
        SLACK_AUTH_TOKEN: Joi.string().required(),
        SLACK_USER_ID: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),
    TogglModule,
    SlackModule,
    GoogleCloudModule,
  ],
})
export class AppModule {}
