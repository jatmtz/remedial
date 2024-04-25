import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { CookieService } from 'ngx-cookie-service';
import { PartidasService } from '../../Servicios/partidas.service';
import { RutasService } from '../../Servicios/rutas.service';
import { Router } from '@angular/router';
import { Partida } from '../inicio/inicio.component';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

type Rectangle = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
  animations: [
    trigger('shipAnimation', [
      state('start', style({
        transform: 'translateX(-60px)'
      })),
      state('end', style({
        transform: 'translateX(520px)'
      })),
      transition('start => end', animate('{{ tiempoBarco }}ms linear', keyframes([
        style({ transform: 'translateX(-60px)' }),
        style({ transform: 'translateX(520px)' })
      ])))
    ]),
    trigger('bombAnimation', [
      state('start', style({
        transform: 'translateY(-100px)'
      })),
      state('end', style({
        transform: 'translateY(300px)'
      })),
      transition('start => end', animate('3s linear', keyframes([
        style({ transform: 'translateY(-100px)' }),
        style({ transform: 'translateY(300px)' })
      ])))
    ])
  ]
})

export class JuegoComponent implements OnInit {
  isLoading = false;
  token: string | null = null;
  idPartida: number | null = null; 
  tiempo: number = 9000;
  tiempoBarco = 9000;
  barcos = 15;
  shipPosition = { x: 0, y: 0 };
  bombPosition = { x: 0, y: 0 };
  choque = false;
  disabledBarra = false;
  barraHabilitada = true;
  clicsEnBarra = 0;

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

  mostrarBomba() {
    const containerBombHeight = document.querySelector('.containerBombHeight');
    if (containerBombHeight) {
      containerBombHeight.classList.remove('hide-container');
    }
  }

  ocultarBomba() {
    const containerBombHeight = document.querySelector('.containerBombHeight');
    if (containerBombHeight) {
      containerBombHeight.classList.add('hide-container');
    }
  }

  iniciarAnimacionBomba(event: MouseEvent) {
    if (!this.barraHabilitada || this.disabledBarra) {
      return;
    }

    this.mostrarBomba(); // Mostrar el contenedor de la bomba

    this.clicsEnBarra++;

    if (this.clicsEnBarra >= 2) {
      this.barraHabilitada = false;
    }

    const containerBomba = document.querySelector('.containerBomba') as HTMLElement;
    const barra = event.currentTarget as HTMLElement;
    const barraRect = barra.getBoundingClientRect();
    const clickX = event.clientX - barraRect.left;

    if (containerBomba) {
      this.disabledBarra = true;
      containerBomba.classList.add('moverBomba');
      containerBomba.style.setProperty('--bombStartX', `${clickX}px`);

      setTimeout(() => {
        containerBomba.classList.remove('moverBomba');
        containerBomba.style.removeProperty('--bombStartX');
        /*this.checkCollision();*/
        this.disabledBarra = false;
        this.ocultarBomba()
      }, 3000);
    }
  }



  activarAnimacion() {
    const containerImagen = document.querySelector('.containerImagen');
  
    containerImagen?.classList.add('moverBarco');
  
    setTimeout(() => {
      containerImagen?.classList.remove('moverBarco');
      /*this.checkCollision();*/
      this.cambiarTurno();
    }, this.tiempoBarco);
  }

  checkCollision() {
    const shipRect = { x1: this.shipPosition.x - 35, y1: this.shipPosition.y - 35, x2: this.shipPosition.x + 35, y2: this.shipPosition.y + 35 };
    const bombRect = { x1: this.bombPosition.x - 35, y1: this.bombPosition.y - 35, x2: this.bombPosition.x + 35, y2: this.bombPosition.y + 35 };
  
    this.choque = this.checkRectanglesCollision(shipRect, bombRect);
  
    if (this.choque) {
      console.log('¡Colisión detectada!');
      this.tiempoBarco -= 500; // Reducir la duración de la animación en 0.5 segundos
    }
  }


  checkRectanglesCollision(rect1: Rectangle, rect2: Rectangle): boolean {
    return (
      rect1.x1 < rect2.x2 &&
      rect1.x2 > rect2.x1 &&
      rect1.y1 < rect2.y2 &&
      rect1.y2 > rect2.y1
    );
  }


/*obtenerTurno(idPartida: number) {
    this.partidasService.obtenerTurno(idPartida).subscribe(*/
      

 
    obtenerTurno() {
      this.partidasService.obtenerTurno(Number(this.cookie.get('idPartida'))).subscribe(
        (data: any) => {
          if (data.turno === Number(this.cookie.get('id'))) {
            this.activarAnimacion();
            this.barraHabilitada = true; // Habilitar la barra al inicio del turno
            this.clicsEnBarra = 0; // Reiniciar el contador de clics en la barra
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
