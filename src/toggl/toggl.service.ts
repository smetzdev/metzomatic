import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TogglDate } from './lib/toggl-date';
import { ConfigService } from '@nestjs/config';

/**
 * Service for interacting with the Toggl API.
 */
@Injectable()
/**
 * Service for interacting with the Toggl API.
 */
export class TogglService {
  /** ID of the Toggl workspace */
  private readonly WORKSPACE_ID: string;
  /** Authorization Token for Toggl */
  private readonly API_TOKEN: string;
  /** Toggl API Endpoint for building reports */
  private readonly togglApiUrl: string;
  /** Wellformed axios config with toggl authorization setup */
  private readonly httpConfig: AxiosRequestConfig;

  /**
   * @param httpService The HttpService used for making HTTP requests.
   * @param configService The ConfigService used for retrieving configuration values.
   */
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.WORKSPACE_ID = this.configService.get<string>('TOGGL_WORKSPACE_ID');
    this.API_TOKEN = this.configService.get<string>('TOGGL_API_TOKEN');

    this.togglApiUrl = `https://api.track.toggl.com/reports/api/v3/workspace/${this.WORKSPACE_ID}/search/time_entries.pdf`;

    this.httpConfig = {
      headers: {
        'Content-Type': 'application/json',
        // Using Buffer.from() instead of btoa() because btoa() is not available in NodeJS for base64 encoding.
        Authorization: `Basic ${Buffer.from(
          `${this.API_TOKEN}:api_token`,
        ).toString('base64')}`,
      },
    };
  }

  /**
   * Retrieves the current month's report for a specific client.
   * @param clientId The ID of the client.
   * @returns A Promise that resolves to the report data as a PDF-Blob.
   */
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

  /**
   * Retrieves the last month's report for a specific client.
   * @param clientId The ID of the client.
   * @returns A Promise that resolves to the report data as a PDF-Blob.
   */
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
