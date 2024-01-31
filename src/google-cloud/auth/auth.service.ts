import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

/**
 * Service responsible for handling authentication with Google Cloud APIs.
 */
@Injectable()
export class AuthService {
  /** The client ID for OAuth2 authentication. */
  private readonly CLIENT_ID: string;
  /** The client secret for OAuth2 authentication. */
  private readonly CLIENT_SECRET: string;
  /** The refresh token for OAuth2 authentication. */
  private readonly REFRESH_TOKEN: string;
  /** OAuth2Client for handling authorization in Google APIs */
  public oauth2Client: OAuth2Client;

  /**
   * @param configService The configuration service used to retrieve the necessary credentials.
   */
  constructor(private readonly configService: ConfigService) {
    this.CLIENT_ID = this.configService.get<string>('GCLOUD_CLIENT_ID');
    this.CLIENT_SECRET = this.configService.get<string>('GCLOUD_CLIENT_SECRET');
    this.REFRESH_TOKEN = this.configService.get<string>('GCLOUD_REFRESH_TOKEN');

    this.oauth2Client = new OAuth2Client(this.CLIENT_ID, this.CLIENT_SECRET);
    this.oauth2Client.setCredentials({
      refresh_token: this.REFRESH_TOKEN,
    });
  }
}
