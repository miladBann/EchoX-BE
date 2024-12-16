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
}
