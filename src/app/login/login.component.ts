import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  role: 'student' | 'teacher' | 'admin' = 'student';
  errorMessage = '';
  dummyProperty = true;

  constructor(private router: Router) {}

  onLogin() {
    this.errorMessage = ''; // Clear previous errors

    // Dummy authentication logic
    if (this.username === 'student' && this.password === 'student' && this.role === 'student') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'student'); // Store role
      this.router.navigate(['/home']);
    } else if (this.username === 'teacher' && this.password === 'teacher' && this.role === 'teacher') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'teacher'); // Store role
      this.router.navigate(['/home']);
    } else if (this.username === 'admin' && this.password === 'admin' && this.role === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'admin'); // Store role
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid credentials or role.';
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('userRole'); // Clear role if login fails
    }
  }
} 