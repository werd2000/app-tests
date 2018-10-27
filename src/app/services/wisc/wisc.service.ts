import { Injectable } from '@angular/core';
import { WiscTomado } from '../../models/wiscTomado.model';
import { Router } from '@angular/router';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class WiscService {

  public listaWics: WiscTomado[] = [];
  public wisc: WiscTomado;
  public token: string;
  private httpOptions;

  constructor(
    public router: Router,
    public http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token': this._usuarioService.token
      })
    };
    this.cargarListaWics();
  }

  // ======================================================
  // Obtiene la lista de tests
  // ======================================================
  cargarListaWics() {
    const url = URL_SERVICES + '/wiscadministrado';
    return this.http.get(url, this.httpOptions ).pipe(
      map( (resp: any) => {
        return resp.wiscAdministrado;
      }));

  }

  obtenerWicsId(id: string) {
    const url = URL_SERVICES + '/wiscadministrado/' + id;
    return this.http.get(url, this.httpOptions ).pipe(
      map( (resp: any) => {
        return resp.wiscAdministrado;
      }));
  }

  // =====================================================================
  // Elimina un test por id
  // =====================================================================
  borrarWisc(id: string) {
    const url = URL_SERVICES + '/wiscadministrado/' + id;
    return this.http.delete(url, this.httpOptions ).pipe(
      map( (resp: any) => {
        return resp.wiscBorrado;
      }));
  }

  crearWisc( wisc: WiscTomado ) {
    const url = URL_SERVICES + '/wiscadministrado';
    return this.http.post(url, wisc, this.httpOptions ).pipe(
      map( (resp: any) => {
        return resp.wiscAdministrado;
      }));
  }

  // =====================================================================
  // Busca un test por un término de búsqueda
  // =====================================================================
  // buscarWisc( termino: string ) {
  //   return this.afs.collection<WiscTomado>(
  //     'wisc-tomado', ref => ref.where('paciente', '==', termino)
  //   ).valueChanges();
  // }

  // =====================================================================
  // Actualiza un test por Id
  // =====================================================================
  actualizarWisc( wisc: WiscTomado ) {
    const url = URL_SERVICES + '/wiscadministrado/' + wisc._id;
    return this.http.put(url, wisc, this.httpOptions ).pipe(
      map( (resp: any) => {
        return resp.wiscGuardado;
      }));
  }

}
