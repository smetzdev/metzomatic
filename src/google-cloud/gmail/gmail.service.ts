import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';

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
  /** The transporter used for sending emails. */
  private readonly transporter: Transporter;

  /**
   * @param configService The configuration service used to retrieve Gmail-related env vars.
   */
  constructor(private readonly configService: ConfigService) {
    this.USER_EMAIL = this.configService.get<string>('GMAIL_USER_EMAIL');
    this.USER_NAME = this.configService.get<string>('GMAIL_FROM_NAME');
    this.CLIENT_ID = this.configService.get<string>('GMAIL_CLIENT_ID');
    this.CLIENT_SECRET = this.configService.get<string>('GMAIL_CLIENT_SECRET');
    this.REFRESH_TOKEN = this.configService.get<string>('GMAIL_REFRESH_TOKEN');

    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.USER_EMAIL,
        clientId: this.CLIENT_ID,
        clientSecret: this.CLIENT_SECRET,
        refreshToken: this.REFRESH_TOKEN,
      },
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

    return this.transporter.sendMail({
      from,
      to: emailDto.to,
      subject: emailDto.subject,
      text: emailDto.text,
    });
  }
}
