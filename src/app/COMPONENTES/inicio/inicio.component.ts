import { CommonModule } from '@angular/common';
import { compileComponentFromMetadata } from '@angular/compiler';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PartidasService } from '../../Servicios/partidas.service';
import { RutasService } from '../../Servicios/rutas.service';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css' 
})
export class InicioComponent {

  $partidas: Partida[] = [];
  noPartidas = false;
  isLoading = false;
  token: string | null = null;
  private echoChannel: any;

  constructor(
    private router: Router,
    private cookie: CookieService,
    private partidasService: PartidasService,
    private rutasService: RutasService
  ) { }

  ngOnInit() {
    (window as any).Pusher = Pusher;
    (window as any).Echo = new Echo({
      broadcaster: 'pusher',
      key: '1234ABCD',
      cluster: 'mt1',
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStatus: true,
    }); 
    this.echoChannel = (window as any).Echo.channel('barco-pantalla');
    this.echoChannel.listen('.barco', (data: any) => {
      this.getPartidas();
      console.log('hola');
      
    });
    this.getPartidas();
    this.token = this.cookie.get('access_token');
  }



  getPartidas()
  {
    this.partidasService.getPartidas().subscribe((data: any) => {
      console.log(data);
      this.$partidas = Object.values(data);
      if (this.$partidas.length === 0) {
        this.noPartidas = true;
      }
      else {
        this.noPartidas = false;
      }
    });
  }

  crearPartida()
  {
    this.isLoading = true;
    if (this.echoChannel) {
      this.echoChannel.stopListening('.barco');
    }
    this.partidasService.createPartida().subscribe((data: any) => {
      console.log(data);
      this.cookie.delete('idPartida');
      this.cookie.set('idPartida', data.id);
      this.isLoading = false
      this.router.navigate(['/espera']);
    });
  }

  unirsePartida(id: number)
  {
    if (this.echoChannel) {
      this.echoChannel.stopListening('.barco');
    }
    this.partidasService.unirsePartida(id).subscribe((data: any) => {
      console.log(data);
      this.cookie.delete('idPartida');
      this.cookie.set('idPartida', data.id);
      this.router.navigate(['/juego']);
    });
  }

  logOut()
  {
    this.isLoading = true;
    this.rutasService.logout().subscribe((data: any) => {
      console.log(data);
      this.cookie.deleteAll();
      localStorage.clear();
      this.isLoading = false;
      this.router.navigate(['/login']);
    });
  }


}

export interface Partida {
  id: number;
	id_jugador1: number | null;
	id_jugador2: number | null;
	id_estado: number;
	barcos: number;
	barcos_jugador1: number;
	barcos_jugador2: 0;
	ganador: null;
	perdedor: null;
}