import { StreamService } from './stream.service';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('stream')
export class StreamController {
    constructor(private readonly streamService: StreamService){}

    @Get('audio')
    streamAudio(@Query('url') videoUrl: string, @Res() res: Response): void {
        try {
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Transfer-Encoding', 'chunked');
            this.streamService.streamMedia('audio', res, videoUrl);
        } catch (error) {
            res.status(500).json({ message: 'Error streaming audio' });
        }
    }

    @Get('video')
    streamVideo(@Query('url') videoUrl: string, @Res() res: Response): void {
        try {
            res.setHeader('Content-Type', 'video/mp4');
            res.setHeader('Transfer-Encoding', 'chunked');
            this.streamService.streamMedia('video', res, videoUrl);
        } catch (error) {
            res.status(500).json({ message: 'Error streaming video' });
        }
    }
}
