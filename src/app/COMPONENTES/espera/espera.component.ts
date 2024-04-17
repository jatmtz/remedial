import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-espera',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './espera.component.html',
  styleUrl: './espera.component.css'
})
export class EsperaComponent {

}
