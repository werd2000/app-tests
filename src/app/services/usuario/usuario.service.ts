import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';


@Injectable()
export class UsuarioService {

  private usuarioDoc: AngularFirestoreDocument<Usuario>;
  private usuariosCollection: AngularFirestoreCollection<Usuario>;
  public usuarios: Usuario[] = [];
  public usuario: Usuario;
  public menu;
  private existe: boolean;

  constructor(
    public router: Router,
    public afs: AngularFirestore,
    public _subirArchivoService: SubirArchivoService,
    public afAuth: AngularFireAuth
  ) {
    this.usuariosCollection = afs.collection<Usuario>('usuarios-tests');
    this.cargarStorage();
  }

  // =====================================================================
  // Crea un usuario
  // =====================================================================
  crearUsuario( usuario: Usuario) {
    return this.afs.collection('usuarios-tests').doc(usuario._id).set(usuario);
  }

  // =====================================================================
  // Busca un usuario por email
  // =====================================================================
  existeUsuarioEmail(email: string) {
    this.usuarioDoc = this.afs.doc<Usuario>(`usuarios-tests/${email}`);
    return this.usuarioDoc.valueChanges();
  }

  // =====================================================================
  // Comprueba que está logueado
  // =====================================================================
  estaLogueado() {
    return ( this.usuario != null ) ? true : false;
  }

  // =====================================================================
  // Carga los datos del Storage
  // =====================================================================
  cargarStorage() {
    // todo: verificar si hay token y no usuario
    if ( localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.usuario = null;
      this.menu = [];
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

    return this.existeUsuarioEmail(usuario.email).pipe(
      map( (usu: any) => {
        // console.log(usu);
        if (usu != null) {
          if (usu.password === usuario.password) {
            this.usuario = usu;
            return usu;
          }
        }
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
  // Actualiza un usuario por Id
  // =====================================================================
  actualizarUsuario( usuario: Usuario ) {
    return this.afs.collection('usuarios-tests').doc(usuario.email).set(usuario);
  }

  // =====================================================================
  // Cambia la imagen de un usuario
  // =====================================================================
  cambiarImagen( archivo: File, usuario: Usuario) {
    this._subirArchivoService.subirArchivo(archivo, 'usuario', usuario)
      .then((resp: Usuario) => {
        this.guardarStorage(resp.email, '', resp, '');
        });
  }

  // =====================================================================
  // Obtiene los usuarios paginados
  // =====================================================================
  cargarUsuarios() {
    return this.usuariosCollection.valueChanges();
  }

  // =====================================================================
  // Busca un usuario por un término de búsqueda
  // =====================================================================
  buscarUsuario ( termino: string ) {
    return this.afs.collection<Usuario>(
      'usuarios-tests', ref => ref.where('nombre', '==', termino)
    ).valueChanges();
  }

  buscarUsuarioId ( id: string ) {
    return this.afs.collection('usuarios-tests').doc(id).valueChanges();
  }

  // =====================================================================
  // Elimina un usuario
  // =====================================================================
  borrarUsuario( id: string ) {
    return this.afs.collection('usuarios-tests').doc(id).delete();
  }

}
