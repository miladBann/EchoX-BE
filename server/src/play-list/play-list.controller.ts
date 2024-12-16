import { Controller, Get, Query,Res, Headers } from '@nestjs/common';
import { PlayListService } from './play-list.service';
import { Response } from 'express';

@Controller('play-list')
export class PlayListController {
    constructor(private readonly playlistService: PlayListService){}

    private readonly userToken = `ya29.a0ARW5m77NngstThTODQHKopYtC8MaVyinP5BOCW0bEy35JcS-JwKko8fsdxCptX7OJg2eSMBQZy4QYvXFS1VUaTYgdK9LSfknpf0cTKn4BMoPhIlsga9c-mZ2RmaeR_wvqu8VGCirGVfTw2BuIxZ5jF5mDItBxWHH2p200enxaCgYKAX4SARISFQHGX2Mi09ziRTRd1OEMUFw_8e7b6Q0175`

    @Get("")
    async getPlaylists(@Res() res: Response): Promise<void> {
        try {
            const data = await this.playlistService.getUserPlaylists(this.userToken);
            res.json(data);
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }
}
