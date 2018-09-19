import { Injectable } from '@angular/core';
import { WiscTomado } from '../../models/wiscTomado.model';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WiscService {

  private wiscDoc: AngularFirestoreDocument<WiscTomado>;
  private wiscCollection: AngularFirestoreCollection<WiscTomado>;
  public listaWics: WiscTomado[] = [];
  public wisc: WiscTomado;

  constructor(
    public router: Router,
    public afs: AngularFirestore
  ) {
    this.wiscCollection = afs.collection<WiscTomado>('wisc-tomado');
  }

  // ======================================================
  // Obtiene la lista de tests
  // ======================================================
  cargarListaWics() {
    return this.wiscCollection.valueChanges();
  }

  obtenerWicsId(id: string) {
    return this.afs.collection('wics-tomado').doc(id).valueChanges();
  }

  // =====================================================================
  // Elimina un test por id
  // =====================================================================
  borrarWisc(id: string) {
    return this.afs.collection('wics-tomado').doc(id).delete();
  }

  crearWisc( wisc: WiscTomado ) {
    return this.afs.collection('wisc-tomado').doc(wisc._id).set(wisc);
  }

  // =====================================================================
  // Busca un test por un término de búsqueda
  // =====================================================================
  buscarWisc( termino: string ) {
    return this.afs.collection<WiscTomado>(
      'wisc-tomado', ref => ref.where('paciente', '==', termino)
    ).valueChanges();
  }

  // =====================================================================
  // Actualiza un test por Id
  // =====================================================================
  actualizarWisc( wisc: WiscTomado ) {
    return this.afs.collection('wisc-tomado').doc(wisc._id).set(wisc);
  }

  // =====================================================================
  // Busca un test por Id
  // =====================================================================
  existeWiscId(id: string) {
    this.wiscDoc = this.afs.doc<WiscTomado>(`wisc-tomado/${id}`);
    return this.wiscDoc.valueChanges();
  }
}
