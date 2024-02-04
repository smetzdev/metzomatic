import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';
import { SlackService } from '../../slack/slack.service';
import { ThingsService } from '../../things/things.service';

describe('GithubService', () => {
  let service: GithubService;
  let slackService: SlackService;
  let thingsService: ThingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GithubService,
        {
          provide: ThingsService,
          useValue: {
            createTodo: jest.fn(),
          },
        },
        {
          provide: SlackService,
          useValue: {
            notifyMe: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GithubService>(GithubService);
    slackService = module.get<SlackService>(SlackService);
    thingsService = module.get<ThingsService>(ThingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('handleReview request should create a todo and notify me on slacek', async () => {
    const reviewRequestDto = {
      pull_request: {
        title: 'PR Title',
        html_url: 'https://smetz.dev',
        user: {
          login: 'smetzdev',
        },
      },
    };
    const expectedTodo = {
      title: 'Review PR: PR Title',
      notes: 'https://smetz.dev',
    };
    const expectedSlackMessage = `Hey! smetzdev requested a review on a PR called PR Title: https://smetz.dev`;

    await service.handleReviewRequest(reviewRequestDto);

    expect(thingsService.createTodo).toHaveBeenCalledWith(expectedTodo);
    expect(slackService.notifyMe).toHaveBeenCalledWith(expectedSlackMessage);
  });
});
