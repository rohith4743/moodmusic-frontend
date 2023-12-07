import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl } from './config/api-config';
import { Mood } from './types/global.types';



@Injectable({
  providedIn: 'root'
})
export class MusicRecommendationService {

  constructor(private http: HttpClient) { }

  getSongsByMood(mood: Mood): Observable<any> {
    let params = new HttpParams().set('mood', mood);
    return this.http.get(`${apiUrl}/moodmusic/get_songs`, { params });
  }  


  detectMood(imageData: FormData): Observable<any> {
    return this.http.post(`${apiUrl}/moodmusic/detect-emotion/`, imageData);
  }
  
}
