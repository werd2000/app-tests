import { Injectable } from '@angular/core';
import { Paciente } from '../../models/paciente.model';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private pacienteDoc: AngularFirestoreDocument<Paciente>;
  private pacientesCollection: AngularFirestoreCollection<Paciente>;
  public pacientes: Paciente[] = [];
  public paciente: Paciente;

  constructor(
    public router: Router,
    public afs: AngularFirestore,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.pacientesCollection = afs.collection<Paciente>('pacientes-tests');
  }

  // ======================================================
  // Obtiene la lista de pacientes
  // ======================================================
  cargarPacientes() {
    return this.pacientesCollection.valueChanges();
  }

  // ======================================================
  // Obtiene la lista de pacientes
  // ======================================================
  cargarPacientesTerapeuta(idTerapeuta: string) {
    return this.afs.collection<Paciente>(
      'pacientes-tests', ref => ref.where('cargado_por', '==', idTerapeuta)
    ).valueChanges();
  }

  obtenerPacienteId(id: string) {
    return this.afs.collection('pacientes-tests').doc(id).valueChanges();
  }

  // =====================================================================
  // Elimina un paciente por id
  // =====================================================================
  borrarPaciente(id: string) {
    return this.afs.collection('pacientes-tests').doc(id).delete();
  }

  crearPaciente( paciente: Paciente ) {
    return this.afs.collection('pacientes-tests').doc(paciente._id).set(paciente);
  }

  // =====================================================================
  // Busca un paciente por un término de búsqueda
  // =====================================================================
  buscarPaciente( termino: string ) {
    return this.afs.collection<Paciente>(
      'pacientes-tests', ref => ref.where('apellido', '==', termino)
    ).valueChanges();
  }

  // =====================================================================
  // Actualiza un paciente por Id
  // =====================================================================
  actualizarPaciente( paciente: Paciente ) {
    return this.afs.collection('pacientes-tests').doc(paciente._id).set(paciente);
  }

  // =====================================================================
  // Busca un paciente por Id
  // =====================================================================
  existePacienteId(id: string) {
    this.pacienteDoc = this.afs.doc<Paciente>(`pacientes-tests/${id}`);
    return this.pacienteDoc.valueChanges();
  }

  // =====================================================================
  // Cambia la imagen de un usuario
  // =====================================================================
  cambiarImagen( archivo: File, paciente: Paciente) {
    this._subirArchivoService.subirArchivo(archivo, 'paciente', paciente)
      .then((resp: Paciente) => {
        // this.guardarStorage(resp.email, '', resp, '');
        });
  }

}
