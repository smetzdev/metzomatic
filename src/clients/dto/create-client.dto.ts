import { IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  togglWorkspaceId: number;
}
