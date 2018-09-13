import { Component, OnInit } from '@angular/core';
import { Test } from '../../models/test.model';
import { TestService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

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
      this.usuario.misTests.push(test._id);
    } else {
      this.usuario.misTests = [test._id];
    }
    this._usuarioService.actualizarUsuario(this.usuario)
    .then( () => {
      this._usuarioService.guardarStorage(this.usuario.email, 'true', this.usuario, '');
      swal('Mis Tests actualizados', test.nombre, 'success' );
    })
    .catch(err => console.log(err));
  }

  quitarMisTest(test: Test) {
    this.usuario.misTests
      .splice(
        this.usuario.misTests
          .findIndex(t => t === test._id), 1
        );
    // console.log(this.usuario.misTests);
    this._usuarioService.actualizarUsuario(this.usuario)
    .then( () => {
      this._usuarioService.guardarStorage(this.usuario.email, 'true', this.usuario, '');
      swal('Mis Tests actualizados', test.nombre, 'success' );
    })
    .catch(err => console.log(err));
  }

  esMiTest(test: Test) {
    if (this.usuario.misTests) {
      // console.log(this.usuario.misTests.findIndex(t => t === test._id));
      if (this.usuario.misTests.findIndex(t => t === test._id) >= 0) {
        console.log('red');
        return 'red';
      } else {
        console.log('black');
        return 'black';
      }
    }
  }

}
