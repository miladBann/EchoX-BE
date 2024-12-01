import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class SearchService {
    private readonly customeSearchKey = "AIzaSyA__t6xgZ_o0T5LM_NFEnJh4DIi-6XmLog";
    private readonly searchEngineID = "a419f6a00e73747cf";
    
    async SearchSongs(query: string): Promise<any> {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                  part: 'snippet',
                  maxResults: 10,
                  q: query,
                  type: 'video',
                  cx: this.searchEngineID,
                  key: this.customeSearchKey,
                },
            });
            return response.data;

        } catch (error) {
            console.error("Error fetching song from YouTube", error);
            throw new HttpException("Error fetching YouTube data", HttpStatus.NO_CONTENT);
        }
    }

    async getYoutubeSuggestions(query: string): Promise<any> {
        try {
            const response = await axios.get(
                'https://suggestqueries.google.com/complete/search',
                {
                params: {
                    q: query,
                    client: 'youtube',
                    ds: 'yt',
                },
                },
            );
        
            const rawResponse = response.data;
        
            // Use a regex to extract the array inside window.google.ac.h(...)
            const match = rawResponse.match(/window\.google\.ac\.h\((.*)\)/);
        
            if (!match || match.length < 2) {
                throw new Error('Invalid response format from YouTube suggestions API');
            }
        
            const parsedData = JSON.parse(match[1]);
        
            // Extract the suggestions from the parsed data
            const suggestions = parsedData[1]?.map((suggestion: any) => ({
                suggestion: suggestion[0],
            }));
        
            return suggestions || [];
        } catch (error) {
            console.error('Error fetching YouTube suggestions:', error.message);
            throw new HttpException(
                'Error fetching YouTube suggestions',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
      
}
