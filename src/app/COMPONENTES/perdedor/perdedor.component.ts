import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perdedor',
  standalone: true,
  imports: [],
  templateUrl: './perdedor.component.html',
  styleUrl: './perdedor.component.css'
})
export class PerdedorComponent {
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  Regresar()
  {
    this.router.navigate(['/inicio']);
  }

}
