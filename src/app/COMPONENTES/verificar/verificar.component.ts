import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RutasService } from '../../Servicios/rutas.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-verificar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './verificar.component.html',
  styleUrl: './verificar.component.css'
})
export class VerificarComponent {
  backendErrors: any = {};
  succesMessages: any = {};

  constructor(private router: Router, 
    private authService: RutasService, 
    private cookie: CookieService,
  ) { }

  verifyForm : FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  });

  isLoading = false;

  verifyCode() {
    if (this.verifyForm.valid) {
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');
      const codigo = this.verifyForm.value.code;
      this.authService.verifyCode(codigo, email!, password!).subscribe({
        next: (response: any) => {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          this.succesMessages.message = 'Código correcto';
          this.backendErrors.code = '';
          this.backendErrors.message = '';
          this.cookie.set('token', response.access_token, 1);
          setTimeout(() => {
            this.backendErrors = {};
            this.isLoading = false;
            this.router.navigate(['/bienvenida']);
          }, 3000);
        },
        error: (error: HttpErrorResponse) => {
          console.log(codigo);
          console.log(error.error);
          this.isLoading = false;
          if (error.status === 400) {
            console.log(error.error);
            this.backendErrors.code = 'Código incorrecto';
          }
          else if (error.status === 401) {
            console.log(error.error);
            this.backendErrors.code = 'Credenciales incorrectas';
          }
          else if(error.status === 404){
            this.backendErrors.code = 'Usuario no encontrado';
          }
          else{
            this.backendErrors = {message:'Error al verificar el código, intente mas tarde'};
          }
        }
      });
    }
  }

}
