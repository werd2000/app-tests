import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puntuaciones-escalares',
  templateUrl: './puntuaciones-escalares.component.html',
  styles: []
})
export class PuntuacionesEscalaresComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  guardarPuntuacionesEscalares(f) {
    console.log(f);
  }

}
