import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import swal from 'sweetalert';

@Injectable()
export class UsuarioService {

  public usuarios: Usuario[] = [];
  public usuario: Usuario;
  public token: string;
  public menu;
  private existe: boolean;
  public headers;

  constructor(
    public router: Router,
    private _subirArchivoService: SubirArchivoService,
    private http: HttpClient
    ) {
    this.cargarStorage();
  }

  // =====================================================================
  // Actualiza un usuario por Id
  // =====================================================================
  actualizarUsuario( usuario: Usuario ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token': this.token
      })
    };
    const url = URL_SERVICES + '/usuario/' + usuario._id;
    return this.http.put(url, usuario, httpOptions).pipe(
      map( (res: any) => {
        console.log(res.usuario);
        this.guardarStorage(res.usuario._id, this.token, res.usuario, '');
        swal('Usuario actualizado', usuario.email, 'success');
        return res.usuario;
      }));
  }

  // =====================================================================
  // Guarda un test en favoritos
  // =====================================================================
  actualizarFavoritos( usuario: Usuario ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token': this.token
      })
    };
    // const usuario = { misTests: idTest };
    // usuario.misTests.push(idTest);
    const url = URL_SERVICES + '/usuario/' + usuario._id;
    return this.http.put(url, usuario, httpOptions).pipe(
      map( (res: any) => {
        console.log(res.usuario);
    //     this.guardarStorage(res.usuario._id, this.token, res.usuario, '');
    //     swal('Usuario actualizado', usuario.email, 'success');
    //     return res.usuario;
      }));
  }

  // =====================================================================
  // Crea un usuario
  // =====================================================================
  crearUsuario( usuario: Usuario) {
    const url = URL_SERVICES + '/usuario';
    return this.http.post( url, usuario ).pipe(
      map( (res: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return res.usuario;
      }));
  }

  // =====================================================================
  // Busca un usuario por email
  // =====================================================================
  existeUsuarioEmail(email: string) {
    // this.usuarioDoc = this.afs.doc<Usuario>(`usuarios-tests/${email}`);
    // return this.usuarioDoc.valueChanges();
  }

  // =====================================================================
  // Comprueba que está logueado
  // =====================================================================
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  // =====================================================================
  // Carga los datos del Storage
  // =====================================================================
  cargarStorage() {
    // todo: verificar si hay token y no usuario
    if ( localStorage.getItem('token')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
      this.token = localStorage.getItem('token');
    } else {
      this.usuario = null;
      this.menu = [];
      this.token = '';
    }
  }

  // =====================================================================
  // Guarda datos en el Storage
  // =====================================================================
  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.menu = menu;
    this.token = token;
  }

  // =====================================================================
  // Sale del sistema
  // =====================================================================
  logout() {
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  // =====================================================================
  // Login normal: usuarios y password
  // =====================================================================
  login( usuario: Usuario, recordar ) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + '/login';

    return this.http.post( url, usuario).pipe(
      map( (resp: any) => {
        this.guardarStorage(resp.usuario._id, resp.token, resp.usuario, '');
      }));
  }

  // =====================================================================
  // Guarda en el Storage los datos de inicio de sesión
  // =====================================================================
  recordarUsuario(recordar, usuario) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
  }

  // =====================================================================
  // Cambia la imagen de un usuario
  // =====================================================================
  cambiarImagen( archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, '');
      })
      .catch( resp => {
        console.log(resp);
      });
  }

  // =====================================================================
  // Obtiene los usuarios paginados
  // =====================================================================
  cargarUsuarios() {
    const url = URL_SERVICES + '/usuario';

    return this.http.get( url ).pipe(
      map( (resp: any) => {
        return resp.usuario;
      }));
  }

  // =====================================================================
  // Busca un usuario por un término de búsqueda
  // =====================================================================
  buscarUsuario ( termino: string ) {
    // return this.afs.collection<Usuario>(
    //   'usuarios-tests', ref => ref.where('nombre', '==', termino)
    // ).valueChanges();
  }

  buscarUsuarioId ( id: string ) {
    const url = URL_SERVICES + '/usuario/' + id;

    return this.http.get( url ).pipe(
      map( (resp: any) => {
        return resp.usuario;
      }));
  }

  // =====================================================================
  // Elimina un usuario
  // =====================================================================
  borrarUsuario( id: string ) {
    // return this.afs.collection('usuarios-tests').doc(id).delete();
  }

}
