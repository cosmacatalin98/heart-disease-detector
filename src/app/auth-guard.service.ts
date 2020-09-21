import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  opt = 0;
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    switch (this.opt) {
      case 0: {
        alert('Username or password is incorect !')
        this.router.navigate(['']);
        return false;
      }

      case 1: {
        this.router.navigate(['sciencistpage']);
        break;
      }

      case 2: {
        return true;
      }
    }


  }
}
