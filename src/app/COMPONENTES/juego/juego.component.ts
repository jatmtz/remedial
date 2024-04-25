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
  barcos = 15;

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
      this.obtenerTurno();
      console.log('hola-juego');
    });
    this.obtenerTurno();
    this.barcosRestantes();
  }

  activarAnimacion() {
    const containerImagen = document.querySelector('.containerImagen');
    containerImagen?.classList.add('moverBarco');

    setTimeout(() => {
      containerImagen?.classList.remove('moverBarco');
      this.cambiarTurno();
  }, this.tiempo);
  }


/*obtenerTurno(idPartida: number) {
    this.partidasService.obtenerTurno(idPartida).subscribe(*/
      

 
  obtenerTurno() {
    this.partidasService.obtenerTurno(Number(this.cookie.get('idPartida'))).subscribe(
      (data: any) => {
        if (data.turno === Number(this.cookie.get('id'))) {
          this.activarAnimacion();
          
        }
        this.idPartida = data.idPartida;
      },
      error => {
        console.error('Error al obtener el turno:', error);
      }
    );
  }

  cambiarTurno() {
    //const data = { id_partida: idPartida };
    this.partidasService.cambiarTurnos(Number(this.cookie.get('idPartida'))).subscribe(
      response => {
        console.log('Turno cambiado exitosamente:', response);
      },
      error => {
        console.error('Error al cambiar el turno:', error);
      }
    );
  }

  barcosRestantes()
  {
    this.partidasService.getBarcos(Number(this.cookie.get('idPartida'))).subscribe(
      (data: any) => {
        this.barcos = data.barcos;
        if(this.barcos === 0)
        {
          this.finilizarPartida();
        }
      },
      error => {
        console.error('Error al obtener los barcos restantes:', error);
      }
    );
  }

  finilizarPartida()
  {
    this.partidasService.finalizarPartida({id: this.cookie.get('idPartida')}).subscribe(
      (data: any) => {
        console.log(data);
        if(data.ganador === Number(this.cookie.get('id')))
        {
          this.router.navigate(['/ganador']);
        }
        else if(data.perdedor === Number(this.cookie.get('id')))
        {
          this.router.navigate(['/perdedor']);
        }
      },
      error => {
        console.error('Error al finalizar la partida:', error);
      }
    );
  }
}
