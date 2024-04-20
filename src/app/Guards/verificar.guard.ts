import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class verificarGuard implements CanActivate {
  constructor(
    private router : Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if(email && password) {
      return true;
    }
    this.router.navigate(['/login']);
    return of(false);
  } 
} 