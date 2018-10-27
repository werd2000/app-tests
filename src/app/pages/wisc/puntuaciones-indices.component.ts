import { Component, OnInit } from '@angular/core';
import { GrupoEtareoService } from 'src/app/services/service.index';
import { PuntuacionesIndices } from 'src/app/models/puntuacionesIndices';

@Component({
  selector: 'app-puntuaciones-indices',
  templateUrl: './puntuaciones-indices.component.html',
  styles: []
})
export class PuntuacionesIndicesComponent implements OnInit {

  listaGruposEtareos;
  pi: PuntuacionesIndices;

  constructor(
    public _grupoEtareoService: GrupoEtareoService,
  ) { }

  ngOnInit() {
    this.listaGruposEtareos = this._grupoEtareoService.grupos;
    console.log(this.listaGruposEtareos);
    this.pi = new PuntuacionesIndices('', '', '', '', '');
  }

  guardarPuntuacionesIndice(f) {
    console.log(f);
  }

}
