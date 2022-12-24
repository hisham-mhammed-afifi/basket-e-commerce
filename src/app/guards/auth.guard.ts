import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authSrv: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authSrv.getToken() ?? '';
    if (this.authSrv.loggedIn && token) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
