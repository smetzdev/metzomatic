import { Post, Body } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WebhookController } from '../webhook-controller.decorator';
import { GithubService } from './github.service';
import { ReviewRequestDto } from './dto/ReviewRequest.dto';

@WebhookController('github')
@ApiTags('Webhooks/Github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post('review-request')
  @ApiOperation({ summary: 'Get last month report in PDF format' })
  @ApiResponse({
    status: 200,
    description: 'Review request handled succesfully!',
  })
  handleReviewRequest(@Body() reviewRequestDto: ReviewRequestDto) {
    return this.githubService.handleReviewRequest(reviewRequestDto);
  }
}
