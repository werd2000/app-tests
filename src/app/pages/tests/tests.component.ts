import { Component, OnInit } from '@angular/core';
import { Test } from '../../models/test.model';
import { TestService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
declare var swal: any;

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styles: []
})
export class TestsComponent implements OnInit {

  cargando = false;
  totalRegistros: number;
  tests: Test[] = [];
  usuario: Usuario;
  misTests = [];

  constructor(
    public _testService: TestService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarTests();
  }

  cargarTests() {
    this.cargando = true;
    this._testService.cargarTests()
      .subscribe( resp => {
        this.tests = resp;
        this.totalRegistros = this.tests.length;
        this.cargando = false;
      });
  }

  agregarMisTest(test: Test) {
    if (this.usuario.misTests) {
      this.usuario.misTests = this.usuario.misTests + ',' + test._id;
    } else {
      this.usuario.misTests = test._id;
    }

    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

  quitarMisTest(test: Test) {
    const testsArray = this.usuario.misTests.split(',');
    testsArray.splice(
        testsArray.findIndex(t => t === test._id), 1
        );
    this.usuario.misTests = testsArray.join(',');
    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

  esMiTest(test: Test) {
    if (this.usuario.misTests) {
      const testsArray = this.usuario.misTests.split(',');
      if (testsArray.findIndex(t => t === test._id) >= 0) {
        return 'red';
      } else {
        return 'black';
      }
    } else {
      return 'black';
    }
  }

  borrarTest(test: Test) {
    swal({
      title: '¿Está seguro?',
      text: 'Está por borrar el test ' + test.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then ( borrar => {
      if (borrar != null) {
        this._testService.borrarTest(test._id)
        .subscribe( borrado => {
          this.cargarTests();
          swal('Test borrado', 'El test ha sido borrado correctamente', 'success');
        });
      }
    });
  }

}
