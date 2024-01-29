import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebClient } from '@slack/web-api';

@Injectable()
export class SlackService {
  private readonly slack: WebClient;

  constructor(private readonly configService: ConfigService) {
    const SLACK_TOKEN = this.configService.get<string>('SLACK_AUTH_TOKEN');
    this.slack = new WebClient(SLACK_TOKEN);
  }

  public async notifyChannel(channel: string, message: string) {
    return await this.slack.chat.postMessage({
      channel,
      text: message,
    });
  }

  public async notifyMe(message: string) {
    const userId = this.configService.get<string>('SLACK_USER_ID');

    return await this.slack.chat.postMessage({
      channel: userId,
      text: message,
    });
  }
}
