import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PlayListService {

    async getUserPlaylists(userToken: string): Promise<any> {
        try {
            const response = await axios.get("https://www.googleapis.com/youtube/v3/playlists", {
                params: {
                    part: "snippet",
                    mine: true,
                },
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
                
            })
            return response.data;
        } catch (error){
            console.log("error:" + error);
            throw new HttpException("Error fetching YouTube data", HttpStatus.NO_CONTENT);
        }
    }

    async createUserPlaylists(userToken: string, body: any): Promise<any> {
        try {
            const { title, description } = body;
            const response = await axios.post(
                "https://www.googleapis.com/youtube/v3/playlists?part=snippet,status",
                {
                    snippet: {
                        title: title,
                        description: description || "",
                    },
                    status: {
                        privacyStatus: 'private',
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error creating playlist:', error.response?.data || error.message);
            throw new HttpException(
                error.response?.data?.error?.message || "Error creating the playlist",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
}
