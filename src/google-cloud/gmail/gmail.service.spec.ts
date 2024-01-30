import { Test, TestingModule } from '@nestjs/testing';
import { GmailService } from './gmail.service';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/send-email.dto';

describe('GmailService', () => {
  let service: GmailService;
  let transporterSendMailMock: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GmailService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GmailService>(GmailService);

    transporterSendMailMock = jest.fn();
    (service as any).transporter = {
      sendMail: transporterSendMailMock,
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call transporter.send with the right arguments', async () => {
    const sendEmailDto: SendEmailDto = {
      to: 'recipient@example.com',
      subject: 'Test Subject',
      text: 'Test Body',
    };

    await service.sendMail(sendEmailDto);

    expect(transporterSendMailMock).toHaveBeenCalledWith({
      to: sendEmailDto.to,
      subject: sendEmailDto.subject,
      text: sendEmailDto.text,
    });
  });
});
