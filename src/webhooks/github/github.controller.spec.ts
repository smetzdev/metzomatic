import { Test, TestingModule } from '@nestjs/testing';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

describe('GithubController', () => {
  let controller: GithubController;
  let githubService: GithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubController],
      providers: [
        {
          provide: GithubService,
          useValue: {
            handleReviewRequest: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GithubController>(GithubController);
    githubService = module.get<GithubService>(GithubService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should handle review request with the right params', () => {
    const reviewRequestDto = {
      pull_request: {
        title: 'PR Title',
        html_url: 'https://smetz.dev',
        user: {
          login: 'smetzdev',
        },
      },
    };

    controller.handleReviewRequest(reviewRequestDto);
    expect(githubService.handleReviewRequest).toHaveBeenCalledWith(
      reviewRequestDto,
    );
  });
});
