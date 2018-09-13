import { Injectable } from '@angular/core';
import { Test } from '../../models/test.model';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class TestService {

  private testDoc: AngularFirestoreDocument<Test>;
  private testsCollection: AngularFirestoreCollection<Test>;
  public tests: Test[] = [];
  public test: Test;


  constructor(
    public router: Router,
    public afs: AngularFirestore,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.testsCollection = afs.collection<Test>('tests');
  }

  // ======================================================
  // Obtiene la lista de tests
  // ======================================================
  cargarTests() {
    return this.testsCollection.valueChanges();
  }

  obtenerTestId(id: string) {
    return this.afs.collection('tests').doc(id).valueChanges();
  }

  // =====================================================================
  // Elimina un test por id
  // =====================================================================
  borrarTest(id: string) {
    return this.afs.collection('tests').doc(id).delete();
  }

  crearTest( test: Test ) {
    return this.afs.collection('tests').doc(test._id).set(test);
  }

  // =====================================================================
  // Busca un test por un término de búsqueda
  // =====================================================================
  buscarTest( termino: string ) {
    return this.afs.collection<Test>(
      'tests', ref => ref.where('nombre', '==', termino)
    ).valueChanges();
  }

  // =====================================================================
  // Actualiza un test por Id
  // =====================================================================
  actualizarTest( test: Test ) {
    return this.afs.collection('tests').doc(test._id).set(test);
  }

  // =====================================================================
  // Busca un test por Id
  // =====================================================================
  existeTestId(id: string) {
    this.testDoc = this.afs.doc<Test>(`tests/${id}`);
    return this.testDoc.valueChanges();
  }

  // =====================================================================
  // Cambia la imagen de un test
  // =====================================================================
  cambiarImagen( archivo: File, test: Test) {
    this._subirArchivoService.subirArchivo(archivo, 'test', test)
      .then((resp: Test) => {
        // this.guardarStorage(resp.email, '', resp, '');
        });
  }

}
