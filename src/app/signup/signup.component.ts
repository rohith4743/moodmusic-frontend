import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignUp() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.authService.signUp(this.firstName, this.lastName, this.email, this.password).subscribe(
      response => {
        console.log('User created successfully', response);
        this.successMessage = 'User created successfully';
        setTimeout(() => this.router.navigate(['/login']), 2000);
        // Handle successful signup
      },
      error => {
        console.error('There was an error during signup', error);
        this.errorMessage = 'There was an error during signup';
        // Handle error
      }
    );
  }
}
