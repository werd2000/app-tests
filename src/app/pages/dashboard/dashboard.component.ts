import { Component, OnInit } from '@angular/core';
import { PacienteService, TestService, UsuarioService } from '../../services/service.index';
import { Paciente } from '../../models/paciente.model';
import { Test } from '../../models/test.model';
import { Usuario } from '../../models/usuario.model';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  pacientes: Paciente[];
  tests: Test[];
  cargando = false;
  totalRegistros: number;
  usuario: Usuario;

  constructor(
    public _pacientesService: PacienteService,
    public _testService: TestService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarPacientes();
    this.cargarTests();
  }

  cargarTests() {
    this.cargando = true;
    this._testService.cargarTests()
      .subscribe( resp => {
      // console.log(resp);
      this.tests = resp;
      this.totalRegistros = this.tests.length;
      this.cargando = false;
    });
    if (this.usuario.role === 'ROLE_USER') {
      this.cargarMisTest();
    }
  }

  cargarMisTest() {
    console.log(this.tests);
    for (const t of this.tests) {
      console.log(t);
    }
  }

  cargarPacientes() {
    this.cargando = true;
    let pac;
    if (this.usuario.role === 'ROLE_USER') {
      pac = this._pacientesService.cargarPacientesTerapeuta(this.usuario._id);
    } else {
      pac = this._pacientesService.cargarPacientes();
    }
      pac.subscribe( resp => {
        this.pacientes = resp;
        this.totalRegistros = this.pacientes.length;
        this.cargando = false;
      });
  }

}
