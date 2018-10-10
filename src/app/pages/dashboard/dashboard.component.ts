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
  tests: Test[] = [];
  nuevosTests: Test[];
  cargando = false;
  totalRegistros: number;
  totalNuevosTests: number;
  usuario: Usuario;

  constructor(
    public _pacientesService: PacienteService,
    public _testService: TestService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarNuevosTests();
    // this.cargarTests();
    this.cargarPacientes();
  }

  // Carga los test del usuario
  cargarTests() {
    if (this.usuario.misTests) {
      for (const t of this.usuario.misTests) {
        this._testService.obtenerTestId(t)
          .subscribe( (resp: Test) => {
            if (resp !== undefined) {
              this.tests.push(resp);
            }
          });
      }
    }
  }

  // Carga los tests nuevos
  cargarNuevosTests() {
    this.cargando = true;
    this._testService.cargarTests()
      .subscribe( resp => {
      this.nuevosTests = resp;
      this.totalNuevosTests = this.nuevosTests.length;
      this.cargando = false;
    });
  }

  cargarPacientes() {
    this.cargando = true;
    let pac;
    if (this.usuario.role === 'TERAPEUTA_ROLE' || this.usuario.role === 'USER_ROLE') {
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
