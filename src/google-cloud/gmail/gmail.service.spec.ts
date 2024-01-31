import { Test, TestingModule } from '@nestjs/testing';
import { GmailService } from './gmail.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { SendEmailDto } from './dto/send-email.dto';
import { GmailMessageEncoder } from './lib/gmail-message-encoder';

describe('GmailService', () => {
  let service: GmailService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GmailService,
        {
          provide: AuthService,
          useValue: {
            oauth2Client: {},
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'GMAIL_USER_EMAIL') {
                return 'test@test.de';
              }
              if (key === 'GMAIL_FROM_NAME') {
                return undefined;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<GmailService>(GmailService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call transporter.send with the right arguments', async () => {
    const sendEmailDto: SendEmailDto = {
      to: configService.get<string>('GMAIL_USER_EMAIL'),
      subject: 'Test Subject',
      text: 'Test Message',
    };
    // This function is well tested
    const expectedRawString = GmailMessageEncoder.getBase64Mail({
      from: configService.get<string>('GMAIL_USER_EMAIL'),
      ...sendEmailDto,
    });

    const mockGmailClientSend = jest.fn().mockResolvedValue(true);
    service['gmailClient'].users.messages.send = mockGmailClientSend;

    await service.sendMail(sendEmailDto);

    expect(mockGmailClientSend).toHaveBeenCalledWith({
      userId: 'me',
      requestBody: {
        raw: expectedRawString,
      },
    });
  });
});
