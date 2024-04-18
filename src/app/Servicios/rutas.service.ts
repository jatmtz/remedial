import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RutasService {
  private url = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private router: Router) { }

  Registro(data: any){
    this.http.post(this.url + 'register', data).pipe(
      catchError((error) => {
        if (error.status === 400) {
          console.log('Error 400');
          return throwError(error);
        }
        if (error.status === 500){
            console.log('Error 500');
            return throwError(error);
          }
        return throwError(error);
      })
    ).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/login']);
    });
  } 

  Login(data: any){
    this.http.post(this.url + 'logCode', data).pipe(
      catchError((error) => {
        if (error.status === 400) {
          console.log('Error 400');
        }
        if (error.status === 401) {
          console.log('Error 401');
        }
        if (error.status === 500){
          console.log('Error 500');
          return throwError(error);
        }
        return throwError(error);
      })
    ).subscribe((res: any) => {
      localStorage.setItem('email', data.email);
      localStorage.setItem('password', data.password);
      this.router.navigate(['/verificar']);
    });
  }

  Verificar(data: any){
    this.http.post(this.url + 'verifyCode', data).pipe(
      catchError((error) => {
        if (error.status === 400) {
          console.log('Error 400');
        }
        if (error.status === 401) {
          console.log('Error 401');
        }
        if (error.status === 400)
          {
            console.log('Error 400');
            return throwError(error);
          }
        if (error.status === 500){
          console.log('Error 500');
          return throwError(error);
        }
        return throwError(error);
      })
    ).subscribe((res: any) => {
      this.router.navigate(['/bienvenida']);
    });
  }

}
