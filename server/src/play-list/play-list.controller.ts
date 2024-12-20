import { Controller, Get, Query,Res, Headers, Post, Body } from '@nestjs/common';
import { PlayListService } from './play-list.service';
import { Response } from 'express';

@Controller('play-list')
export class PlayListController {
    constructor(private readonly playlistService: PlayListService){}

    private readonly userToken = `ya29.a0ARW5m76915cJSw6Va-2Eru45o6PMDxNaesAJy2_bPPzIsuTMpo1Fko6VIGoIfFhjumH5-XEztV4dgWP_4cJ5VTSrxpDpwPr5Sl5Dmr_up5PQd22L0cT1HLcZVlxxpx0OTwoyp5eL_tyNrLoO6TCeUDlP9GqJVDflfBTCJULTaCgYKAcoSARISFQHGX2MisPlBmZjPSxwfPEDNVYiOEw0175`

    @Get("")
    async getPlaylists(@Res() res: Response): Promise<void> {
        try {
            const data = await this.playlistService.getUserPlaylists(this.userToken);
            res.json(data);
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

    @Post("create-playlist")
    async createPlaylist(@Res() res: Response, @Body() body: any): Promise<void> {
        try {
            const data = await this.playlistService.createUserPlaylists(this.userToken, body);
            res.status(200).json({ message: 'Playlist created successfully', playlistId: data.id }); 
        }catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
