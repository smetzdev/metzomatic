import { IsObject, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class GitHubUser {
  @IsString()
  @ApiProperty({ example: 'smetzdev' })
  login: string;
}

class PullRequestDto {
  @IsString()
  @ApiProperty({ example: 'PR Title' })
  title: string;
  @IsString()
  @ApiProperty({ example: 'https://github.com/dummy-repo/pull-requests/666' })
  html_url: string;
  @IsObject()
  @ValidateNested()
  @Type(() => GitHubUser)
  @ApiProperty()
  user: GitHubUser;
}

export class ReviewRequestDto {
  @IsObject()
  @ValidateNested()
  @Type(() => PullRequestDto)
  @ApiProperty()
  pull_request: PullRequestDto;
}
