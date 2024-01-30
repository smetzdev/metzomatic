import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, gmail_v1 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { SendEmailDto } from './dto/send-email.dto';
import { GmailMessageEncoder } from './lib/gmail-message-encoder';

/**
 * Service for sending emails using Gmail.
 */
@Injectable()
export class GmailService {
  /** The email address of the user. */
  private readonly USER_EMAIL: string;
  /** The name of the user (optional). */
  private readonly USER_NAME?: string;
  /** The client ID for OAuth2 authentication. */
  private readonly CLIENT_ID: string;
  /** The client secret for OAuth2 authentication. */
  private readonly CLIENT_SECRET: string;
  /** The refresh token for OAuth2 authentication. */
  private readonly REFRESH_TOKEN: string;
  /** The Gmail client used for sending emails. */
  private gmailClient: gmail_v1.Gmail;

  /**
   * @param configService The configuration service used to retrieve Gmail-related env vars.
   */
  constructor(private readonly configService: ConfigService) {
    this.USER_EMAIL = this.configService.get<string>('GMAIL_USER_EMAIL');
    this.USER_NAME = this.configService.get<string>('GMAIL_FROM_NAME');
    this.CLIENT_ID = this.configService.get<string>('GMAIL_CLIENT_ID');
    this.CLIENT_SECRET = this.configService.get<string>('GMAIL_CLIENT_SECRET');
    this.REFRESH_TOKEN = this.configService.get<string>('GMAIL_REFRESH_TOKEN');

    // Setup the Gmail client with oAuth2.
    const oAuth2Client = new OAuth2Client(this.CLIENT_ID, this.CLIENT_SECRET);
    oAuth2Client.setCredentials({
      refresh_token: this.REFRESH_TOKEN,
    });

    this.gmailClient = google.gmail({ version: 'v1', auth: oAuth2Client });
  }

  /**
   * Sends an email using the configured Gmail account.
   * @param emailDto The email data transfer object containing the email details.
   * @returns A promise that resolves when the email is sent successfully.
   */
  sendMail(emailDto: SendEmailDto) {
    const from = this.USER_NAME
      ? `"${this.USER_NAME}" <${this.USER_EMAIL}>`
      : this.USER_EMAIL;

    // Gmail expects emails to be base64url encoded.
    // https://developers.google.com/gmail/api/guides/sending
    const encodedMessage = GmailMessageEncoder.getBase64Mail({
      from,
      to: emailDto.to,
      subject: emailDto.subject,
      text: emailDto.text,
    });

    return this.gmailClient.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
  }
}
