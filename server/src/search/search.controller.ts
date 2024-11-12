import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService){}

    @Get("Search")
    async searchYoutube(@Query('query') query: string, @Res() res: Response): Promise<void> {
        try {
            const data = await this.searchService.SearchSongs(query);
            res.json(data);
        }catch (error) {
            res.status(500).json({ message: 'Error fetching data from YouTube' });
        }
    }

    
}
