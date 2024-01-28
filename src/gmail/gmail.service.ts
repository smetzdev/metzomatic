import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class GmailService {
  private readonly USER_EMAIL: string;
  private readonly USER_NAME?: string;
  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;
  private readonly REFRESH_TOKEN: string;
  private readonly transporter: Transporter;

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
