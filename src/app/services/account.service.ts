import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'https://localhost:44398/api/account'; // Replace with your actual API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  /* Authentication Functions */

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials)
      .pipe(
        map(response => {
          // Store authentication token or user data in local storage or service
          this.authService.setLogin(response);
          return response;
        }),
        catchError(error => this.handleError(error))
      );
  }

  register(userData: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData)
      .pipe(catchError(error => this.handleError(error)));
  }

  logout(): void {
    // Remove authentication token or user data from local storage or service
    this.authService.removeLogin();
  }

  /* User Management Functions */

  getCurrentUser(): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<User>(`${this.baseUrl}/users/me`, { headers })
      .pipe(catchError(error => this.handleError(error)));
  }

  updateProfile(userData: User): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.put<User>(`${this.baseUrl}/users/me`, userData, { headers })
      .pipe(catchError(error => this.handleError(error)));
  }

  // ... other user management functions as needed

  private handleError(error: any) {
    const message = 'Error processing request: ';
    console.error(message, error);
    return throwError(message);
  }
}
