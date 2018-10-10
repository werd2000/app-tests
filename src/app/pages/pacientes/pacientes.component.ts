import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { PacienteService, UsuarioService } from '../../services/service.index';
// import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
// import { ModalAlumnoService } from '../../components/modal-alumno/modal-alumno.service';
import { Usuario } from '../../models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
declare var swal: any;

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: []
})
export class PacientesComponent implements OnInit {

  pacientes: Paciente[] = [];
  totalRegistros = 0;
  cargando = false;
  usuario: Usuario;

  constructor(
    public _pacientesService: PacienteService,
    public _usuarioService: UsuarioService,
    public route: Router
  ) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarPacientes();
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
      });
    this.cargando = false;
  }

  borrarPaciente(pac: Paciente) {
    swal({
      title: '¿Está seguro?',
      text: 'Está por borrar al paciente ' + pac.nombre + ' ' + pac.apellido,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then ( borrar => {
      if (borrar != null) {
        this._pacientesService.borrarPaciente( pac._id )
          .subscribe( borrado => {
              this.cargarPacientes();
              swal('Paciente borrado', 'El paciente ha sido borrado correctamente', 'success');
            });
      }
    });
  }

}
