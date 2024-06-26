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

  finalizarPartida(id_partida: number): Observable<any>{
    return this.http.put(`${environment.api_url}/partidas/finalizarPartida`, {id_partida: id_partida}, {headers: this.headers});
  }

  getBarcos(id:number): Observable<any>{
    return this.http.get(`${environment.api_url}/partidas/barcos/${id}`, {headers: this.headers});
  }
  
  ataques(id_partida: number): Observable<any>{
    return this.http.post(`${environment.api_url}/partidas/ataque`, {id_partida: id_partida}, {headers: this.headers});
  }

  obtenerTurno(id:number): Observable<any>{
    return this.http.get(`${environment.api_url}/partidas/turno/${id}`, {headers: this.headers});
  }


  cambiarTurnos(id_partida: number): Observable<any>{
    return this.http.put(`${environment.api_url}/partidas/cambiarTurno`, {id_partida}, {headers: this.headers});
  }

  cambiarTurno(idPartida: number): Observable<any> {
    return this.http.put(`${environment.api_url}/partidas/cambiarTurno`, { id_partida: idPartida }, {headers: this.headers});
  }
  
}
