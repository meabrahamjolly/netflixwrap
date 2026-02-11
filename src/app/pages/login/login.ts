import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = '';
  password = '';
  router = inject(Router);

  onLogin() {
    // Mock login - accept any non-empty input
    if (this.email && this.password) {
      localStorage.setItem('netflix_user', JSON.stringify({ email: this.email }));
      this.router.navigate(['/']);
    } else {
      alert('Please enter a valid email and password.');
    }
  }
}
