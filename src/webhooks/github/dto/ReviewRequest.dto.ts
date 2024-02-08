import { IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class GitHubUser {
  @IsString()
  login: string;
}

class PullRequestDto {
  @IsString()
  title: string;

  @IsString()
  html_url: string;

  @IsObject()
  @ValidateNested()
  @Type(() => GitHubUser)
  user: GitHubUser;
}

export class ReviewRequestDto {
  @IsObject()
  @ValidateNested()
  @Type(() => PullRequestDto)
  pull_request: PullRequestDto;
}
