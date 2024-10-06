import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SearchService {
    
    async SearchSongs(query: string): Promise<any> {
        try{
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                  part: 'snippet',
                  maxResults: 10,
                  q: query,
                  type: 'video',
                  key: 'AIzaSyA__t6xgZ_o0T5LM_NFEnJh4DIi-6XmLog',
                },
            });
            return response.data;

        }catch(error){
            console.error("Error fetching song from youtube", error);
            throw new HttpException("Error fetching youtube data", HttpStatus.NO_CONTENT)
        }
    }
}
