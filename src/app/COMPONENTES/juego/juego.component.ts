import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { animate, style } from '@angular/animations';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent implements OnInit{

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {

  }

  ngOnInit(){
    
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
    (window as any).Echo.channel('barco-pantalla')
    .listen('.barco', (data: any) => {
      console.log(data);
      console.log('hola');
      if (data.player === 1){
        this.iniciarAnimacion1();
      } else if (data.player === 2) {
        this.iniciarAnimacion2();
      }
    
    });
  }

  iniciarAnimacion1(){
    const imagen = this.elementRef.nativeElement.querySelector('.containerImagen');

    this.renderer.addClass(imagen, 'moverBarco');
  }

  iniciarAnimacion2(){
    const imagen = this.elementRef.nativeElement.querySelector('.containerImagen');

    this.renderer.addClass(imagen, 'moverBarco');
  }



}
