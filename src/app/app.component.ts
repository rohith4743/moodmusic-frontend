import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  isGuest = true;

  constructor(private authService: AuthService) {
    this.authService.getIsLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.getIsGuest().subscribe(guest => {
      this.isGuest = guest;
    });
  }

  // In AppComponent
  logout() {
    // Perform logout logic...
    this.authService.setIsLoggedIn(false);
    this.authService.setIsGuest(true);
  }
}
