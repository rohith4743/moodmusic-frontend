import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './config/api-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private isGuest = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  setIsLoggedIn(loggedIn: boolean): void {
    this.isLoggedIn.next(loggedIn);
  }

  setIsGuest(guest: boolean): void {
    this.isGuest.next(guest);
  }

  getIsLoggedIn() {
    return this.isLoggedIn.asObservable();
  }

  getIsGuest() {
    return this.isGuest.asObservable();
  }

  login(username : string, password: string) {
    const userData = {
      'username' : username,
      'password' : password
    }
    this.isLoggedIn.next(true);
    this.isGuest.next(false);
    return this.http.post(`${apiUrl}/moodmusic/login/`, userData);
  }

  logout(): void {
    this.isLoggedIn.next(false);
    this.isGuest.next(true);
  }

  signUp(firstName: string, lastName: string, email: string, password: string) {
    const userData = {
      'firstName' : firstName,
      'lastName' : lastName,
      'email' : email,
      'username' : email,
      'password' : password
     };
    return this.http.post(`${apiUrl}/moodmusic/register/`, userData);
  }
}
