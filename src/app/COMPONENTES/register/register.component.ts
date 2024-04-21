import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { RutasService } from '../../Servicios/rutas.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  backendErrors: any = {};
  constructor(private router: Router, 
    private authService: RutasService,
  ) { }

  registerForm : FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255), ]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  isLoading = false;

  register() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          this.isLoading = false;
          alert('Se envió un correo de activación a su email');
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          console.log(this.registerForm.value);
          this.isLoading = false;
          if (error.status === 400) {
            console.log(error.error);
            if(error.error.Errors.email){
              this.backendErrors.email = 'El email ya está en uso';
            }
            else{
              this.backendErrors = {message:'Error al registrarse, intente más tarde'};
            }
          }
        },
      }
    );
    }
    else
    {
      alert('Formulario inválido');
    }
  }
}

