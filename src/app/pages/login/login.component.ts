import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = 'admin@gmail.com';
  password = '123456';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    const data = { email: this.email, password: this.password };

    this.auth.login(data).subscribe({
      next: (res: any) => {
        this.auth.saveUser(res, res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = 'Invalid email or password';
      }
    });
  }
}
