import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(null);

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Register
  register(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/register`, data);
  }

  // Login
  login(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/login`, data);
  }

  // Save user and token
  saveUser(user: any, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  // Load user from local storage
  loadUser() {
    const user = localStorage.getItem('user');
    if (user) this.userSubject.next(JSON.parse(user));
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  // Get logged user
  getUser() {
    return this.userSubject.value;
  }

  // Check admin
  isAdmin() {
    return this.userSubject.value?.isAdmin === true;
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
