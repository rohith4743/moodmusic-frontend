import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl } from './config/api-config';
import { Mood } from './types/global.types';
import { StoragesessionService } from './storagesession.service';



@Injectable({
  providedIn: 'root'
})
export class MusicRecommendationService {

  constructor(private http: HttpClient, private storageService: StoragesessionService) { }

  getSongsByMood(mood: Mood): Observable<any> {
    let params = new HttpParams().set('mood', mood);
    return this.http.get(`${apiUrl}/moodmusic/get_songs`, { params });
  }  


  detectMood(imageData: FormData): Observable<any> {
    return this.http.post(`${apiUrl}/moodmusic/detect-emotion/`, imageData);
  }

  get_playlists() : Observable<any> {
    let headers = {
      "Auth" : this.storageService.getUser()
    }
    return this.http.get(`${apiUrl}/moodmusic/get_playlists`, {headers})
  }

  add_to_playlist(body: any) : Observable<any> {
    let headers = {
      "Auth" : this.storageService.getUser()
    }
    return this.http.post(`${apiUrl}/moodmusic/add_playlist`, body, {headers})
  }
  
}
