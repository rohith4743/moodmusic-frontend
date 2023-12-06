import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl } from './config/api-config';
import { Mood } from './types/global.types';



@Injectable({
  providedIn: 'root'
})
export class MusicRecommendationService {
  private songs = {
    'HAPPY': ['Song 1', 'Song 2', 'Song 3'],
    'SAD': ['Song 4', 'Song 5', 'Song 6'],
    // Add song arrays for the other moods
    'CONFUSED': ['Song 7', 'Song 8', 'Song 9'],
    'DISGUSTED': ['Song 7', 'Song 8', 'Song 9'],
    'ANGRY': ['Song 7', 'Song 8', 'Song 9'],
    'SURPRISED': ['Song 7', 'Song 8', 'Song 9'],
    'FEAR': ['Song 7', 'Song 8', 'Song 9'],
    'CALM': ['Song 7', 'Song 8', 'Song 9'],
    '': []  // Keep this for no mood
  };

  
  

  constructor(private http: HttpClient) { }

  getSongsByMood(mood: Mood): Observable<any> {
    let params = new HttpParams().set('mood', mood);
    return this.http.get(`${apiUrl}/moodmusic/get_songs`, { params });
  }  


  detectMood(imageData: FormData): Observable<any> {
    return this.http.post(`${apiUrl}/moodmusic/detect-emotion/`, imageData);
  }
  
}
