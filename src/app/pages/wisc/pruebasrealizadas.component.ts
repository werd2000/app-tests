import { Component, OnInit } from '@angular/core';
import { WiscTomado } from 'src/app/models/wiscTomado.model';
import { WiscService } from 'src/app/services/service.index';
declare var swal: any;

@Component({
  selector: 'app-pruebasrealizadas',
  templateUrl: './pruebasrealizadas.component.html',
  styles: []
})
export class PruebasrealizadasComponent implements OnInit {

  public cargando = false;
  public totalRegistros = 0;
  public pruebasRealizadas: WiscTomado[] = [];

  constructor(
    private _wiscTomadoService: WiscService,
  ) { }

  ngOnInit() {
    this.cargarPruebas();
  }

  cargarPruebas() {
    this._wiscTomadoService.cargarListaWics()
      .subscribe( resp => {
        // console.log(resp);
        this.pruebasRealizadas = resp;
        this.totalRegistros = this.pruebasRealizadas.length;
      });
  }

  borrarPrueba(prueba: WiscTomado) {
    swal({
      title: '¿Está seguro?',
      text: 'Está por borrar la prueba realizada a ' + prueba.paciente.apellido,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then ( borrar => {
      if (borrar != null) {
        this._wiscTomadoService.borrarWisc(prueba._id)
        .subscribe( borrado => {
          this.cargarPruebas();
          swal('Prueba borrada', 'La prueba ha sido borrado correctamente', 'success');
        });
      }
    });
  }

}
