import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebClient } from '@slack/web-api';

/**
 * Service for interacting with the Slack API.
 */
@Injectable()
export class SlackService {
  /** The Slack client used for interacting with the Slack API. */
  private readonly slack: WebClient;

  /**
   * @param configService The configuration service used to retrieve Slack-related env vars.
   */
  constructor(private readonly configService: ConfigService) {
    const SLACK_TOKEN = this.configService.get<string>('SLACK_AUTH_TOKEN');
    this.slack = new WebClient(SLACK_TOKEN);
  }

  /**
   * Notifies a Slack channel with a message.
   * @param channel The channel to send the message to.
   * @param message The message to send.
   * @returns A Promise that resolves when the message is sent.
   */
  public async notifyChannel(channel: string, message: string) {
    return await this.slack.chat.postMessage({
      channel,
      text: message,
    });
  }

  /**
   * Notifies a user with a message sent as app-robot.
   * @param message The message to send.
   * @returns A Promise that resolves when the message is sent.
   */
  public async notifyMe(message: string) {
    const userId = this.configService.get<string>('SLACK_USER_ID');

    return await this.slack.chat.postMessage({
      channel: userId,
      text: message,
    });
  }
}
