import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { StoragesessionService } from '../storagesession.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private storageService : StoragesessionService) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful');
        this.router.navigate(['/']).then(
          success => {
            this.storageService.saveUser(this.email, this.password);
            console.log('Navigation success:', success); 
            this.router.navigate(['/'])
          },
          err => console.error('Navigation error:', err)
        );
      },
      error => {
        console.error('Login error:', error);
        // Handle login error (e.g., show an error message)
      }
    );
  } 
}
