import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoragesessionService {

  constructor() { }

  saveUser(user: any, password:any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('password', JSON.stringify(password));
  }

  getUser(): string {
    let user = sessionStorage.getItem('user');
    let password = sessionStorage.getItem('password');
    let res =  user ? JSON.parse(user) : ""  ;
    return res + ":" + (password ? JSON.parse(password) : "");
  }

  clearUser(): void {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('password');
  }
}
