import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor(private http: HttpClient, private cookie: CookieService) { }
  private token : string = this.cookie.get('token');
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

  register(data: any): Observable<any>{
    return this.http.post(`${environment.api_url}/auth/register`, data);
  }
  logCode(email:string, password:string): Observable<any>{
    return this.http.post(`${environment.api_url}/auth/logCode`, {email, password});
  }
  verifyCode(codigo:string, email:string, password:string): Observable<any>{
    return this.http.post(`${environment.api_url}/auth/verifyCode`, {codigo, email, password});
  }

  checkAcountActive(userId:number){
    return this.http.get(`${environment.api_url}/auth/checkActive/${userId}`);
  }
  verifyToken(){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookie.get('token'));
    return this.http.post(`${environment.api_url}/auth/verifyToken`, {headers});
  }
  logout(){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.cookie.get('token'));
    return this.http.post(`${environment.api_url}/auth/logout`, {headers}, );
  }

  Estadisticas(): Observable<any>{
    return this.http.get(`${environment.api_url}/auth/estadisticas`, {headers: this.headers});
  }
  

}
