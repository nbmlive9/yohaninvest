import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
// const SECRET_KEY = 'SUDHEER';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
    private companyLoginFlag = false;
  private user: any | null = null;
  private token: string | null = null;
  success: any;
  error: any;

  constructor(private router: Router) {
    this.getUser(); // Load user if stored (optional)
    this.token = localStorage.getItem(TOKEN_KEY);
  }

  // ✅ Token methods
  public saveToken(token: string): void {
    window.localStorage.setItem(TOKEN_KEY, token);
    this.token = token;
    console.log(this.token);
  }

public getToken(): string {
  return localStorage.getItem(TOKEN_KEY) ?? ''; // nullish coalescing
}


  // ✅ Optional user storage (skip if not using)
  public saveUser(user: any): void {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.user = user;
  }

  public getUser(): any {
    try {
      this.user = JSON.parse(localStorage.getItem(USER_KEY) || 'null');
    } catch (error) {
      console.error('Invalid JSON format in localStorage:', error);
      this.user = null;
    }
    return this.user;
  }
// 
  public getRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  public isLogged(): boolean {
    return !!this.getToken(); // Only checks token now
  }

  // ✅ In-memory company login flag
  public setCompanyLoginFlag(): void {
    this.companyLoginFlag = true;
  }

  public isCompany(): boolean {
    return this.companyLoginFlag;
  }

  // ✅ Role-based checks (if user is saved)
  public isAdmin(): boolean {
    return this.getRole() === 'user';
  }


  // ✅ Logout
public signOut(): void {
  // Clear in-memory variables
  this.user = null;
  this.token = null;
  this.companyLoginFlag = false;

  // Clear all browser storage
  window.localStorage.clear();
  window.sessionStorage.clear();

  // Navigate to login and reload window
  this.router.navigateByUrl('/auth-login').then(() => {
    // Hard reload to clear any cached UI and state
    window.location.reload();
  });
}



}
