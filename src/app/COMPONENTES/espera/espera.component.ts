import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-espera',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './espera.component.html',
  styleUrl: './espera.component.css'
})
export class EsperaComponent {

  token: string | null = null;

  constructor( private router: Router, private cookie: CookieService) {}
  

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

    (window as any).Echo.channel('partidas')
      .listen('.partida', (data: any) => {

        console.log(data);
        console.log("HOLA");
        this.redirectToJuegoComponent(data.partidaId);
      });
      this.token = this.cookie.get('access_token');
  }

  redirectToJuegoComponent(partidaId: number) {
    this.router.navigate(['/juego']);
  }
}

