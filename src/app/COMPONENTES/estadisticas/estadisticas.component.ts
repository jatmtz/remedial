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
  totalGanadas: number = 0;
  totalPerdidas: number = 0;
  rivales: string[] = [];

  constructor(private rutasService: RutasService) {}

  ngOnInit() {
    this.getEstadisticas();
  }

  getEstadisticas() {
    this.rutasService.Estadisticas().subscribe(
      (data: Estadisticas[]) => {
        console.log(data);
        this.$estadisticas = data;

        // Calcular totales de partidas ganadas y perdidas
        this.totalGanadas = this.$estadisticas.reduce((total, estadistica) => total + estadistica.ganadas, 0);
        this.totalPerdidas = this.$estadisticas.reduce((total, estadistica) => total + estadistica.perdidas, 0);

        // Calcular los rivales
        this.rivales = this.$estadisticas.flatMap(estadistica => estadistica.rivales);      
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 404) {
          this.noEstadisticas = true;
        }
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