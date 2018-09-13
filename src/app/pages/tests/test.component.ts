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
    this._testsService.cambiarImagen(this.imagenSubir, this.test);
  }

  guardar( test: Test ) {
    test._id = test.nombre;
    if (this.paramId === 'nuevo') {
      this._testsService.existeTestId(test._id)
        .subscribe( async pac => {
          if (pac === null || pac === undefined) {
            this.existe = false;
            await this._testsService.crearTest(test)
              .then( resp => {
                swal('Test creado', `El test ${test.nombre} se creó correctamente`, 'success');
                this.route.navigate([`test/${ test._id }`]);
              })
              .catch(err => console.log(err));
          } else {
            if ( this.existe && pac != null) {
              swal('El test ya existe', `El test ${ test.nombre } ya existe`, 'warning');
            }
          }
        });

    } else {
      test.img = this.test.img;
      // test.domicilio = this.test.domicilio;
      this._testsService.actualizarTest(test)
        .then( resp => {
          swal('Test actualizado', `El test ${ test.nombre } se actualizó correctamente`, 'success');
        });
      }
  }

  crearNuevo() {
    this.route.navigate(['test/nuevo']);
  }

}
