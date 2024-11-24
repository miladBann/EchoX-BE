import { Controller, Get, Query, Res, Headers } from '@nestjs/common';
import { Response } from 'express';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService){}

    @Get("")
    async searchYoutube(@Query('query') query: string,@Headers('Authorization') userToken: string,@Res() res: Response): Promise<void> {
        console.log("user token:" + userToken);
        try {
            const data = await this.searchService.SearchSongs(query, userToken);
            res.json(data);
        }catch (error) {
            res.status(500).json({ message: 'Error fetching data from YouTube' });
        }
    }

    @Get('youtube-autocomplete') async getYoutubeAutocomplete( @Query('query') query: string, @Res() res: Response): Promise<void> {
        try {
            const suggestions = await this.searchService.getYoutubeSuggestions(query);
            res.json(suggestions);
        } catch (error) {
            res
            .status(500)
            .json({ message: 'Error fetching YouTube autocomplete suggestions' });
        }
    }

    
}
