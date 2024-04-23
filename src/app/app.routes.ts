import { Routes } from '@angular/router';
import {LoginComponent} from './COMPONENTES/login/login.component';
import {RegisterComponent} from './COMPONENTES/register/register.component';
import { VerificarComponent } from './COMPONENTES/verificar/verificar.component';
import { BienvenidaComponent } from './COMPONENTES/bienvenida/bienvenida.component';
import { InicioComponent } from './COMPONENTES/inicio/inicio.component';
import { EsperaComponent } from './COMPONENTES/espera/espera.component';
import { JuegoComponent } from './COMPONENTES/juego/juego.component';
import { EstadisticasComponent } from './COMPONENTES/estadisticas/estadisticas.component';
import { verificarGuard } from './Guards/verificar.guard';
import { AuthGuard } from './Guards/auth.guard';

export const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'verificar', component: VerificarComponent, canActivate: [verificarGuard]},
    {path: 'bienvenida', component: BienvenidaComponent, canActivate: [AuthGuard]},
    {path: 'inicio', component: InicioComponent},
    {path: 'espera', component: EsperaComponent},
    {path: 'juego', component: JuegoComponent},
    {path: 'estadisticas', component: EstadisticasComponent}, 

    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }


];
