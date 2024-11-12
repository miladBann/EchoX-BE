import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { spawn } from 'child_process';
import { Response } from 'express';

@Injectable()
export class StreamService {
    // Function to stream media
    streamMedia(format: 'audio' | 'video', res: Response, videoUrl: string): void {
        const args = format === 'audio'
            ? ['--extract-audio', '--audio-format', 'mp3', '-o', '-', videoUrl]
            : ['--format', 'bestvideo+bestaudio', '-o', '-', videoUrl];
    
        console.log(`Running command: C:\\Python312\\python.exe -m yt_dlp ${args.join(' ')}`);
    
        const ytDlpProcess = spawn('C:\\Python312\\python.exe', ['-m', 'yt_dlp', ...args], {
            env: {
                ...process.env,
                PYTHONPATH: 'C:\\Users\\milad\\AppData\\Roaming\\Python\\Python312\\site-packages',
            },
        });
    
        // Stream the standard output directly to the response
        ytDlpProcess.stdout.on('data', (data) => {
            res.write(data);
        });
    
        // Ignore `stderr` logs for progress and other non-error messages
        ytDlpProcess.stderr.on('data', (data) => {
            const message = data.toString();
            if (message.includes('[download]') || message.includes('[info]')) {
                // Ignore progress logs
                console.log(`yt-dlp progress: ${message.trim()}`);
            } else {
                // Log any other type of error
                console.error(`yt-dlp error: ${message}`);
            }
        });
    
        // Handle process completion
        ytDlpProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`yt-dlp process exited with code ${code}`);
                res.status(500).send('Error streaming media');
            } else {
                res.end();
            }
        });
    }
}
