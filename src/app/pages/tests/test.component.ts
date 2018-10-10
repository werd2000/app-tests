import { Component, OnInit } from '@angular/core';
import { Test } from '../../models/test.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/service.index';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: []
})
export class TestComponent implements OnInit {

  test: Test;
  imagenSubir: File;
  imagenTemp: string;
  cargando = false;
  paramId: any;
  existe = true;

  constructor(
    public activatedRoute: ActivatedRoute,
    public _testsService: TestService,
    public route: Router
  ) { }

  ngOnInit() {
    this.cargando = false;
    this.activatedRoute.params.subscribe( params => {
    this.paramId = params['id'];
      if (this.paramId !== 'nuevo') {
        this.cargarTest(this.paramId);
      } else {
        this.test = new Test('', '', [], [], '', '');
      }
    });
  }

  cargarTest( id: string ) {
    this.cargando = true;
    this._testsService.obtenerTestId(id)
        .subscribe( (resp: any) => {
          if (resp === undefined) {
            this.test = new Test('', '', [], [], '');
          } else {
            this.test = resp;
          }
          this.cargando = false;
        });
  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image')) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  // Toma el archivo y lo lleva al servicio
  cambiarImagen() {
    this._testsService.cambiarImagen(this.imagenSubir, this.test._id);
  }

  guardar( test: Test ) {
    if (this.paramId === 'nuevo') {
      console.log(test);
      this._testsService.crearTest(test)
        .subscribe(resp => {
          this.route.navigate(['test/' + resp.test._id]);
        });
    } else {
      test.img = this.test.img;
      this._testsService.actualizarTest(test).subscribe();
      }
  }

  crearNuevo() {
    this.route.navigate(['test/nuevo']);
  }

}
