import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { RutasService } from '../../Servicios/rutas.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  backendErrors: any = {};
  succesMessages: any = {};

  constructor(private router: Router, 
    private authService: RutasService, 
    private cookie: CookieService,
  ) { }

  loginForm : FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255), ]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  isLoading = false;

  Login() {
    if (this.loginForm.valid) {
      this.authService.logCode(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response: any) => {
          console.log(response);
          localStorage.setItem('email', this.loginForm.value.email);
          localStorage.setItem('password', this.loginForm.value.password);
          this.succesMessages.message = 'Loggeo Exitoso';
          this.backendErrors.email = null;
          this.backendErrors.credenciales = null;
          this.backendErrors.active = null;
          this.backendErrors.activeAdmin = null;
          setTimeout(() => {
            this.backendErrors = {};
            this.isLoading = false;
            alert('Loggeo Exitoso, se enviará un correo de verificación a su email');
            this.router.navigate(['/verificar']);
          }, 3000);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.isLoading = false;
          if (error.status === 401 && error.error.credenciales) {
            console.log(error.error);
            this.backendErrors.credenciales = 'Credenciales incorrectas';
            this.backendErrors.active =  null;
            this.backendErrors.email = null;
          }
          else if(error.status === 401 && error.error.active){
            console.log(error.error);
            this.backendErrors.credenciales = null;
            this.backendErrors.active =  'Primero debe activar la cuenta';
            this.backendErrors.email = null;
          }
          else if(error.status === 404){
            console.log(error.error);
            this.backendErrors.email = 'El email no está registrado';
            this.backendErrors.credenciales = null;
          }
          else if(error.status === 403){
            console.log(error.error);
            this.backendErrors.email = null;
            this.backendErrors.credenciales = null;
            this.backendErrors.activeAdmin='Su cuenta ha sido desactivada por los administradores';
          }
          else{
            this.backendErrors.email = null;
            this.backendErrors.credenciales = null;
            this.backendErrors = {message:'Error al loggearse, intente mas tarde'};
          }
        }
      });
    }
  }
 

}
