import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

const MAIN_URL = 'http://192.168.0.100/api/'

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  httpClient = inject(HttpClient);
  router = inject(Router);
  username = '';
  password = '';

  login(): void {
    console.log(123);
    localStorage.setItem("role", this.username);
    this.httpClient.post(MAIN_URL + 'Auth/login/', { login: this.username, password: this.password }).subscribe((res: any) => {
      this.setRole(res.result.role);
      this.setUserId(res.result.userId);
    });
  }

  setRole(role: string): void {
    if (role) {
      localStorage.setItem("role", role);
      this.router.navigate(['/courses']);
    }
  }

  setUserId(id: string): void {
    if (id) {
      localStorage.setItem("userId", id);
    }
  }

  logout(): void {
    this.httpClient.post(MAIN_URL + 'Auth/logout/', null).subscribe((res: any) => console.log(res.result.status));
  }
}
