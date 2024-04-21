import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PartidasService {

  constructor(private http: HttpClient, private cookie: CookieService) { }
  private token : string = this.cookie.get('token');
  private headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

  getPartidas(): Observable<any>{
    return this.http.get(`${environment.api_url}/partidas/index`, {headers: this.headers});
  }

  createPartida(): Observable<any>{
    return this.http.post(`${environment.api_url}/partidas/store`, {headers: this.headers});
  }

  unirsePartida(id_partida: number): Observable<any>{
    return this.http.post(`${environment.api_url}/partidas/unirsePartida`,{id_partida}, {headers: this.headers});
  }

  finalizarPartida(data: any): Observable<any>{
    return this.http.post(`${environment.api_url}/partidas/finalizarPartida`, data, {headers: this.headers});
  }

  getBarcos(id:number): Observable<any>{
    return this.http.get(`${environment.api_url}/partidas/barcos/${id}`, {headers: this.headers});
  }
  
  ataques(data: any): Observable<any>{
    return this.http.post(`${environment.api_url}/partidas/ataques`, data, {headers: this.headers});
  }
}
