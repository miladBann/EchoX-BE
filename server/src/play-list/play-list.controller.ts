import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { PlayListService } from './play-list.service';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('play-list')
export class PlayListController {
  constructor(
    private readonly playlistService: PlayListService,
    private readonly authService: AuthService
  ) {}

  @Get('')
  async getPlaylists(@Res() res: Response): Promise<void> {
    try {
      const userToken = await this.authService.getAccessToken();
      const data = await this.playlistService.getUserPlaylists(userToken);
      res.json(data);
    } catch (error) {
      console.error(`Error fetching playlists: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }

  @Get('token')
  async getToken(@Res() res: Response): Promise<void> {
    try {
        const token = await this.authService.getAccessToken();
        res.json({ token });
    } catch (error) {
        console.error(`Error retrieving token: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
  }



  @Post('create-playlist')
  async createPlaylist(@Res() res: Response, @Body() body: any): Promise<void> {
    try {
      const userToken = await this.authService.getAccessToken();
      const data = await this.playlistService.createUserPlaylists(userToken, body);
      res.status(200).json({ message: 'Playlist created successfully', playlistId: data.id });
    } catch (error) {
      console.error(`Error creating playlist: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }
}
