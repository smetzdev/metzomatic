import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, gmail_v1 } from 'googleapis';
import { SendEmailDto } from './dto/send-email.dto';
import { AuthService } from '../auth/auth.service';
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
  private gmailClient: gmail_v1.Gmail;

  /**
   * @param configService The configuration service used to retrieve Gmail-related env vars.
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    this.USER_EMAIL = this.configService.get<string>('GMAIL_USER_EMAIL');
    this.USER_NAME = this.configService.get<string>('GMAIL_FROM_NAME');

    this.gmailClient = google.gmail({
      version: 'v1',
      auth: this.authService.oauth2Client,
    });
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
