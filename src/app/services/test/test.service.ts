import { Test } from '../../models/test.model';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';

import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TestService {

  public tests: Test[] = [];
  public test: Test;
  public token: string;
  private httpOptions;

  constructor(
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token': this._usuarioService.token
      })
    };
  }

  // ======================================================
  // Obtiene la lista de tests
  // ======================================================
  cargarTests() {
    const url = URL_SERVICES + '/tests';

    return this.http.get(url, this.httpOptions).pipe(
      map( (resp: any) => {
        this.tests = resp.tests;
        return resp.tests;
      }));
  }

  // =====================================================================
  // Elimina un test por id
  // =====================================================================
  borrarTest(id: string) {
    const url = URL_SERVICES + '/test/' + id;
    return this.http.delete(url, this.httpOptions).pipe(
      map( resp => {
        return resp;
      }));
  }

  crearTest( test: Test ) {
    const url = URL_SERVICES + '/test';

    return this.http.post(url, test, this.httpOptions).pipe(
      map( (resp: any) => {
        swal('Test creado', test.nombre, 'success');
        return resp;
      }));
  }

  // =====================================================================
  // Busca un test por un término de búsqueda
  // =====================================================================
  buscarTest( termino: string ) {
    // return this.afs.collection<Test>(
    //   'tests', ref => ref.where('nombre', '==', termino)
    // ).valueChanges();
  }

  // =====================================================================
  // Actualiza un test por Id
  // =====================================================================
  actualizarTest( test: Test ) {
    console.log(this.httpOptions);
    const url = URL_SERVICES + '/test/' + test._id;
    return this.http.put(url, test, this.httpOptions).pipe(
      map( (res: any) => {
        swal('Test actualizado', test.nombre, 'success');
        return res.test;
      }));
  }

  // =====================================================================
  // Busca un test por Id
  // =====================================================================
  obtenerTestId(id: string) {
    const url = URL_SERVICES + '/test/' + id;
    return this.http.get( url , this.httpOptions).pipe(
      map( (resp: any) => {
        this.test = resp.test;
        return resp.test;
      }));
  }


  // =====================================================================
  // Cambia la imagen de un test
  // =====================================================================
  cambiarImagen( archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'tests', id)
      .then( (resp: any) => {
        // console.log(resp);
        // console.log(this.paciente);
        this.test.img = resp.test.img;
        swal('Imagen actualizada', this.test.nombre, 'success');
      })
      .catch( resp => {
        console.log(resp);
      });
  }

}
