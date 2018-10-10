import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { PacienteService, TipoDocService, SexoService, UsuarioService } from '../../services/service.index';
// import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
// import { map } from 'rxjs/operators';
// import { Domicilio } from '../../models/domicilio.model';
declare var swal: any;
// declare var geocoder: any;

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: []
})
export class PacienteComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;
  paciente: Paciente;
  totalRegistros = 0;
  cargando = false;
  paramId: any;
  existe = true;
  map: any;
  listaTipoDoc;
  listaSexos;
  usuario: Usuario;

  constructor(
    public activatedRoute: ActivatedRoute,
    public _pacienteService: PacienteService,
    public _usuarioService: UsuarioService,
    public _tipoDocService: TipoDocService,
    public _sexoService: SexoService,
    public route: Router
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.listaTipoDoc = this._tipoDocService.tipo_doc;
    this.listaSexos = this._sexoService.sexo;
    this.cargando = false;
    this.activatedRoute.params.subscribe( params => {
    this.paramId = params['id'];
      if (this.paramId !== 'nuevo') {
        this.cargarPaciente(this.paramId);
      } else {
        this.paciente = new Paciente('', '', '', '', '', '', this.usuario._id, '');
      }
    });
  }

  cargarPaciente( id: string ) {
    this.cargando = true;
    this._pacienteService.obtenerPacienteId(id)
        .subscribe( (resp: any) => {
          if (resp === undefined) {
            this.paciente = new Paciente('', '', '', '', '', '', this.usuario._id, '');
          } else {
            this.paciente = resp;
          }
          this.cargando = false;
          // console.log(this.paciente);
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
    this._pacienteService.cambiarImagen(this.imagenSubir, this.paciente._id);
  }

  guardar( paciente: Paciente ) {
    paciente.cargado_por = this.usuario._id;
    paciente._id = this.paciente._id;
    const fechaHoy = new Date().toISOString();
    paciente.actualizado = fechaHoy;
    console.log(paciente);
    if (this.paramId === 'nuevo') {
      // console.log('crear');
      this._pacienteService.crearPaciente(paciente)
        .subscribe(resp => {
          this.route.navigate(['paciente/' + resp.paciente._id]);
        });
    } else {
      this._pacienteService.actualizarPaciente(paciente).subscribe();
    }
  }

  crearNuevo() {
    this.route.navigate(['paciente/nuevo']);
  }

}
