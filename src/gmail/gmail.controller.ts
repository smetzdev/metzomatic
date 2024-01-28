import { Controller, Post, Body } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { GmailService } from './gmail.service';

@Controller('gmail')
export class GmailController {
  constructor(private readonly gmailService: GmailService) {}

  @Post('send')
  async sendMail(@Body() emailDto: SendEmailDto) {
    await this.gmailService.sendMail(emailDto);
    return 'Email sent successfully';
  }
}
