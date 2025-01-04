import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class AuthService {
  private oauth2Client;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private readonly configService: ConfigService) {
    this.oauth2Client = new google.auth.OAuth2(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
      this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
      this.configService.get<string>('REDIRECT_URI'),
    );
  }

  async exchangeCodeForTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.accessToken = tokens.access_token;
    this.refreshToken = tokens.refresh_token;

    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }

  async getAccessToken() {
    if (this.accessToken) {
      return this.accessToken;
    }

    if (this.refreshToken) {
      await this.refreshAccessToken(this.refreshToken);
      return this.accessToken;
    }

    throw new Error('User is not authenticated.');
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      this.oauth2Client.setCredentials({ refresh_token: refreshToken });
      const { credentials } = await this.oauth2Client.getAccessToken();
      this.accessToken = credentials.access_token;
      if (credentials.refresh_token) {
        this.refreshToken = credentials.refresh_token;
      }
    } catch (error) {
      throw new Error('Failed to refresh access token.');
    }
  }
  
}
