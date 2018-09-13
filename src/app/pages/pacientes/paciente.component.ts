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
        this.paciente = new Paciente('', '', '', '', '', '', '', '');
      }
    });
  }

  cargarPaciente( id: string ) {
    this.cargando = true;
    this._pacienteService.obtenerPacienteId(id)
      // .pipe( map(res => res[0] ))
        .subscribe( (resp: any) => {
          if (resp === undefined) {
            this.paciente = new Paciente('', '', '', '', '', '', this.usuario._id, '');
          } else {
            this.paciente = resp;
            // this.paciente.fecha_nac = new Date(resp.fecha_nac).toISOString();
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
    this._pacienteService.cambiarImagen(this.imagenSubir, this.paciente);
  }

  guardar( paciente: Paciente ) {
    paciente._id = paciente.nro_doc;
    let fecha = new Date(paciente.fecha_nac).toISOString();
    paciente.fecha_nac = fecha.split('T')[0];
    paciente.cargado_por = this.usuario._id;
    fecha = new Date().toISOString();
    paciente.actualizado = fecha.split('T')[0];
    // console.log(fecha.toISOString());
    if (this.paramId === 'nuevo') {
      this._pacienteService.existePacienteId(paciente.nro_doc)
        .subscribe( async pac => {
          if (pac === null || pac === undefined) {
            this.existe = false;
            await this._pacienteService.crearPaciente(paciente)
              .then( resp => {
                swal('Paciente creado', `El paciente ${paciente.nombre} se creó correctamente`, 'success');
                this.route.navigate([`paciente/${ paciente._id }`]);
              })
              .catch(err => console.log(err));
          } else {
            if ( this.existe && pac != null) {
              swal('El paciente ya existe', `El paciente ${ paciente.nro_doc } ya existe`, 'warning');
            }
          }
        });

    } else {
      paciente.img = this.paciente.img;
      // paciente.domicilio = this.paciente.domicilio;
      this._pacienteService.actualizarPaciente(paciente)
        .then( resp => {
          swal('Paciente actualizado', `El paciente ${ paciente.nombre } se actualizó correctamente`, 'success');
        });
      }
  }

  crearNuevo() {
    this.route.navigate(['paciente/nuevo']);
  }

}
