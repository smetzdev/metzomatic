import { Injectable } from '@nestjs/common';
import { ThingsService } from '../../things/things.service';
import { SlackService } from '../../slack/slack.service';
import { ReviewRequestDto } from './dto/ReviewRequest.dto';

/**
 * Handles Data from GitHub Webhooks.
 * @param reviewRequestDto - The review request data.
 */
@Injectable()
export class GithubService {
  constructor(
    private readonly thingsService: ThingsService,
    private readonly slackService: SlackService,
  ) {}

  /**
   * Handles a review request for a pull request.
   * Creates a todo in Things and notifies the user via Slack.
   * @param reviewRequestDto - The review request data.
   * @returns A promise that resolves when the review request is handled.
   */
  async handleReviewRequest(reviewRequestDto: ReviewRequestDto) {
    const { pull_request: pullRequest } = reviewRequestDto;
    const { title, html_url: htmlUrl, user } = pullRequest;
    const { login: username } = user;

    await this.thingsService.createTodo({
      title: `Review PR: ${title}`,
      notes: htmlUrl,
    });

    const message = `Hey! ${username} requested a review on a PR called ${title}: ${htmlUrl}`;
    await this.slackService.notifyMe(message);

    return 'Review request handled succesfully!';
  }
}
