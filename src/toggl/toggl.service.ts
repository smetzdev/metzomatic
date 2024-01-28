import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TogglDate } from './lib/toggl-date';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TogglService {
  private readonly WORKSPACE_ID =
    this.configService.get<string>('TOGGL_WORKSPACE_ID');
  private readonly API_TOKEN =
    this.configService.get<string>('TOGGL_API_TOKEN');

  private readonly togglApiUrl = `https://api.track.toggl.com/reports/api/v3/workspace/${this.WORKSPACE_ID}/search/time_entries.pdf`;

  private readonly httpConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(
        `${this.API_TOKEN}:api_token`,
      ).toString('base64')}`,
    },
  };

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getCurrentMonthReport(clientId: number): Promise<Blob> {
    const firstDayOfCurrentMonth = new TogglDate()
      .setToFirstDayOfMonth()
      .getFormattedString();

    const today = new TogglDate().getFormattedString();

    const data = {
      start_date: firstDayOfCurrentMonth,
      end_date: today,
      client_ids: [clientId],
    };

    const response = await firstValueFrom(
      this.httpService.post(this.togglApiUrl, data, this.httpConfig),
    );

    return response.data;
  }

  async getLastMonthReport(clientId: number): Promise<Blob> {
    const firstDayOfLastMonth = new TogglDate()
      .substractOneMonth()
      .setToFirstDayOfMonth()
      .getFormattedString();

    const firstDayOfCurrentMonth = new TogglDate()
      .setToFirstDayOfMonth()
      .getFormattedString();

    const data = {
      start_date: firstDayOfLastMonth,
      end_date: firstDayOfCurrentMonth,
      client_ids: [clientId],
    };

    const response = await firstValueFrom(
      this.httpService.post(this.togglApiUrl, data, this.httpConfig),
    );

    return response.data;
  }
}
