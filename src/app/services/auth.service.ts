import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
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
  decodedToken() {
    return jwt_decode(this.token);
  }
}
