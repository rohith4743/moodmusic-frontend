import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private http: HttpClient) {}

  initiateAuth() {
    window.location.href = 'http://localhost:8000/moodmusic/spotify_auth';
  }
}
