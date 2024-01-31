import { Test, TestingModule } from '@nestjs/testing';
import { ThingsService } from './things.service';
import { ConfigService } from '@nestjs/config';
import { GmailService } from '../google-cloud/gmail/gmail.service';

describe('ThingsService', () => {
  let service: ThingsService;
  let gmailService: GmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThingsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'THINGS_EMAIL') return 'test@things.com';
            }),
          },
        },
        {
          provide: GmailService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ThingsService>(ThingsService);
    gmailService = module.get<GmailService>(GmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call GmailService.sendMail with a well-formed dto', async () => {
    const testCreateNoteDto = {
      title: 'TestTitle',
      notes: 'TestNotes',
    };
    const expectedSendMailDto = {
      to: 'test@things.com',
      subject: testCreateNoteDto.title,
      text: testCreateNoteDto.notes,
    };

    await service.createTodo(testCreateNoteDto);

    expect(gmailService.sendMail).toHaveBeenCalledWith(expectedSendMailDto);
  });
});
