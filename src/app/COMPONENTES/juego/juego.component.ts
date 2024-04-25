import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { CookieService } from 'ngx-cookie-service';
import { PartidasService } from '../../Servicios/partidas.service';
import { RutasService } from '../../Servicios/rutas.service';
import { Router } from '@angular/router';
import { Partida } from '../inicio/inicio.component';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  isLoading = false;
  token: string | null = null;
  idPartida: number | null = null; 
  tiempo: number = 9000

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router,
    private cookie: CookieService,
    private partidasService: PartidasService,
    private rutasService: RutasService
  ) {}

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

    (window as any).Echo.channel('player-turn').listen('.player-turno', (data: any) => {
      console.log(data);
      if (data.player === this.cookie.get('id')) {
        //this.iniciarAnimacion1();
      } 
      console.log('hola-juego');
    });

  }

  activarAnimacion() {
    const containerImagen = document.querySelector('.containerImagen');
    containerImagen?.classList.add('moverBarco');

    setTimeout(() => {
      containerImagen?.classList.remove('moverBarco');
  }, this.tiempo);
  }


/*obtenerTurno(idPartida: number) {
    this.partidasService.obtenerTurno(idPartida).subscribe(*/
      

 
  obtenerTurno() {
    /*this.partidasService.obtenerTurno().subscribe(
      (data: any) => {
        console.log('Turno obtenido:', data);
        this.idPartida = data.idPartida;
      },
      error => {
        console.error('Error al obtener el turno:', error);
      }
    );*/
  }

  cambiarTurno(idPartida: number) {
    //const data = { id_partida: idPartida };
    this.partidasService.cambiarTurno(idPartida).subscribe(
      response => {
        console.log('Turno cambiado exitosamente:', response);
      },
      error => {
        console.error('Error al cambiar el turno:', error);
      }
    );
  }
}
