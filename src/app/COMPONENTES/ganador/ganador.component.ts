import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ganador',
  standalone: true,
  imports: [],
  templateUrl: './ganador.component.html',
  styleUrl: './ganador.component.css'
})
export class GanadorComponent {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Regresar()
  {
    this.router.navigate(['/inicio']);
  }
}
