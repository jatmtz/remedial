import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RutasService } from '../../Servicios/rutas.service';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [  CommonModule, RouterOutlet, RouterModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {
  $estadisticas: Estadisticas[] = [];
  noEstadisticas = false;
  ganadas = 0;
  perdidas = 0;
  rivales: string[] = [];

  constructor(private rutasService: RutasService) {}

  ngOnInit() {
    this.getVictorias();
    this.getDerrotas();
    this.getRivales();
  }

  getRivales()
  {
    this.rutasService.getRivales().subscribe(
      (data: any) => {
        console.log(data);
        this.rivales = data.rivales.map((rival: any) => rival.name);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getVictorias()
  {
    this.rutasService.getVictorias().subscribe(
      (data: any) => {
        console.log(data);
        this.ganadas = data.ganadas;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getDerrotas()
  {
    this.rutasService.getDerrotas().subscribe(
      (data: any) => {
        console.log(data);
        this.perdidas = data.perdidas;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}

interface Estadisticas {
  usuario_nombre: string;
  ganadas: number;
  perdidas: number;
  rivales: string[];
}