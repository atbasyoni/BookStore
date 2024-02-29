import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'user_token'; // Replace with your desired storage key

  constructor() { }

  /* Login and Logout Functions */

  setLogin(data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  removeLogin(): void {
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    const data = localStorage.getItem(this.storageKey);
    return !!data; // Check if data exists and is not empty
  }

  /* Token Management (if applicable) */

  getToken(): string | null {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      const parsedData = JSON.parse(data);
      return parsedData?.token; // Access token from parsed data
    }
    return null;
  }

  // ... other authentication functions as needed
}
