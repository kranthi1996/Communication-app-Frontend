import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn = false;
  token: any;
  constructor(private router: Router) {
    this.token = localStorage.getItem('token');
  }
  canActivate(): boolean {
    if (this.token == null) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
