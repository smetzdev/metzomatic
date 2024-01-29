import { Test, TestingModule } from '@nestjs/testing';
import { SlackService } from './slack.service';
import { ConfigService } from '@nestjs/config';

// Mock the WebClient class
jest.mock('@slack/web-api', () => {
  return {
    WebClient: jest.fn().mockImplementation(() => {
      return {
        chat: {
          postMessage: jest.fn().mockResolvedValue({ ok: true }), // Mock postMessage method
        },
      };
    }),
  };
});

describe('SlackService', () => {
  let service: SlackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlackService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'SLACK_AUTH_TOKEN') {
                return 'token';
              }
              if (key === 'SLACK_USER_ID') {
                return 'some-user-id';
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<SlackService>(SlackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send messages in the correct format', async () => {
    const message = 'Hello World!';

    // Call the method
    await service.notifyMe(message);

    // Access the mock postMessage directly from the service instance
    const mockPostMessage = service['slack'].chat.postMessage as jest.Mock;
    expect(mockPostMessage).toHaveBeenCalledWith({
      channel: 'some-user-id',
      text: message,
    });
  });
});
