import { Injectable } from '@angular/core';
import { Paciente } from '../../models/paciente.model';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';

import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { URL_SERVICES } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  public pacientes: Paciente[] = [];
  public paciente: Paciente;
  public token: string;
  private httpOptions;

  constructor(
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public _usuarioService: UsuarioService,
    private http: HttpClient
  ) {
    // this.pacientesCollection = afs.collection<Paciente>('pacientes-tests');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token': this._usuarioService.token
      })
    };
  }

  // ======================================================
  // Obtiene la lista de pacientes
  // ======================================================
  cargarPacientes() {
    const url = URL_SERVICES + '/pacientes';

    return this.http.get( url, this.httpOptions ).pipe(
      map( (resp: any) => {
        return resp.pacientes;
      }));
  }

  // ======================================================
  // Obtiene la lista de pacientes
  // ======================================================
  cargarPacientesTerapeuta(idTerapeuta: string) {
    const url = URL_SERVICES + '/pacientes?terapeuta=' + idTerapeuta;

    return this.http.get( url, this.httpOptions ).pipe(
      map( (resp: any) => {
        return resp.pacientes;
      }));
  }

  obtenerPacienteId(id: string) {
    const url = URL_SERVICES + '/paciente/' + id;

    return this.http.get( url , this.httpOptions).pipe(
      map( (resp: any) => {
        this.paciente = resp.paciente;
        return resp.paciente;
      }));
  }

  // =====================================================================
  // Elimina un paciente por id
  // =====================================================================
  borrarPaciente(id: string) {
    const url = URL_SERVICES + '/paciente/' + id;
    return this.http.delete(url, this.httpOptions).pipe(
      map( resp => {
        console.log(resp);
        return resp;
      }));
  }

  crearPaciente( paciente: Paciente ) {
    const url = URL_SERVICES + '/paciente';
    return this.http.post(url, paciente, this.httpOptions).pipe(
      map( (resp: any) => {
        swal('Paciente creado', paciente.apellido, 'success');
        return resp;
      }));
  }

  // =====================================================================
  // Busca un paciente por un término de búsqueda
  // =====================================================================
  buscarPaciente( termino: string ) {
    // return this.afs.collection<Paciente>(
    //   'pacientes-tests', ref => ref.where('apellido', '==', termino)
    // ).valueChanges();
  }

  // =====================================================================
  // Actualiza un paciente por Id
  // =====================================================================
  actualizarPaciente( paciente: Paciente ) {
    const url = URL_SERVICES + '/paciente/' + paciente._id;
    return this.http.put(url, paciente, this.httpOptions).pipe(
      map( (res: any) => {
        swal('Paciente actualizado', paciente.apellido, 'success');
        return res.paciente;
      }));
  }

  // =====================================================================
  // Busca un paciente por Id
  // =====================================================================
  existePacienteId(id: string) {
    // this.pacienteDoc = this.afs.doc<Paciente>(`pacientes-tests/${id}`);
    // return this.pacienteDoc.valueChanges();
  }

  // =====================================================================
  // Cambia la imagen de un usuario
  // =====================================================================
  cambiarImagen( archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'pacientes', id)
      .then( (resp: any) => {
        // console.log(resp);
        // console.log(this.paciente);
        this.paciente.img = resp.paciente.img;
        swal('Imagen actualizada', this.paciente.nombre, 'success');
        // this.guardarStorage(id, this.token, this.usuario, '');
      })
      .catch( resp => {
        console.log(resp);
      });
  }

}
